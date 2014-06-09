function ddg_spice_forecast(r) {
  "use strict";
  
  var weatherData = {}, spiceData;
  
  // Exit if we've got a bad forecast
  if(!r || !r.hourly || !r.hourly.data || !r.daily || !r.daily.data || !r.flags['ddg-location']) {
    return Spice.failed('forecast');
  }

  // Get the query.
  // We could actually use DDG.get_query() here, but we'd have
  // to strip all the unnecessary stuff that we don't need, and that
  // Forecast.pm already does for us.
  var script = $('[src*="/js/spice/forecast/"]')[0];
  var source = $(script).attr('src');
  var matches = source.match(/forecast\/([^\/]+)\/?(.*)/);
  var query = matches[1];
  var current_location = matches[2];
  query = decodeURIComponent(query);

  // Pass flags['ddg-location'] to DDG.stringsRelevant to check
  // if the result is relevant to our query.
  /*var relevant_location = DDG.stringsRelevant(r.flags['ddg-location'].toLowerCase(), query, undefined, 2);

  // Exit if it's not the current location that we're looking for,
  // not the area code, e.g., 07871, and if it's not relevant.
  if(!current_location && !(/\d/).test(query) && !relevant_location) {
    return Spice.failed('forecast');
  }*/
  
  // Set up some stuff we'll need
  var //$container = $('#zci-forecast'),  // #spice_forecast'
      units = (r.flags && r.flags.units) || 'us',
      unit_labels = {
        'us': {speed: 'mph', temperature: 'F'},
        'si': {speed: 'm/s', temperature: 'C'},
        'ca': {speed: 'km/h', temperature: 'C'},
        'uk': {speed: 'mph', temperature: 'C'},
	'uk2': {speed: 'mph', temperature: 'C'}
      },
      units = r.flags && r.flags.units;

  // Check if the unit that we got is actually in the hash.
  // If the API changes the r.flags or r.flags.units, it will break everything.
  if(!(units in unit_labels)) {
      units = 'us';
  }

  // Skycons (static version of these: http://darkskyapp.github.io/skycons/)
  // var set_skycons = function(elem_id, type) {
  //   var $elem = $('#'+elem_id),
  //       $img = $('<img />').attr('id', $elem.attr('id'))
  //                          .attr('class', $elem.attr('class'))
  //                          .attr('src', '/iu/?u=http://forecastsite.s3.amazonaws.com/skycons/'+type+'.gif') // DDG
  //                          .css({
  //                             'width': $elem.width(),
  //                             'height': $elem.height()
  //                           })
    
  //   $elem.replaceWith($img)
  // };
  
  var get_skycon = function(type) {
	return 'http://forecastsite.s3.amazonaws.com/skycons/'+type+'.gif';
  };
  
  var available_skycon_icons = [
    'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly_cloudy_day',
    'partly_cloudy_night', 'clear_day', 'clear_night'
  ];

  var skycon_type = function(icon) {
    if (icon === 'hail') {
      icon = 'sleet';
    }
    icon = icon.replace(/-/g, '_');
    if ($.inArray(icon, available_skycon_icons) === -1) {
      icon = 'cloudy';
    }
    return icon;
  };
  
  // Convert a wind bearing in degrees to a string
  var wind_bearing_to_str = function(bearing) {
    var wind_i = Math.round(bearing / 45);
    return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'][wind_i];
  };
  
  // Build the current conditions
  var build_currently = function(f) {
    var now = new Date().getTime() / 1000,
        hourly = f.hourly.data,
        current_summary = f.currently.summary,
        speed_units = unit_labels[units].speed,
		feel_str,
		currentObj = {};
    
	currentObj.isCurrent = 1;
    // If the next-hour summary is interesting enough (and we're not on mobile), use that instead
    if(!is_mobile && f.minutely && !f.minutely.summary.match(/ for the hour\.$/)) {
      current_summary = f.minutely.summary;
    }
    
    // Find the first hourly point in the future, so we can figure out
    // if the temperature is rising or falling
    var temp_direction = 0;
    for(var i = 0; i < hourly.length; i++) {
      if(hourly[i].time < now) {
        continue;
      }
      temp_direction = (hourly[i].temperature > f.currently.temperature) ? 1 : -1;
      break;
    }
    
    var temp_str = '<span class="fe_temp_str">'+Math.round(f.currently.temperature)+'&deg;</span>'
	/*
    if(temp_direction > 0)
      temp_str += ' <span class="fe_dir">and rising</span>'
    else if(temp_direction < 0)
      temp_str += ' <span class="fe_dir">and falling</span>'
    */
    if(f.currently.apparentTemperature)
      feel_str = 'Feels like '+Math.round(f.currently.apparentTemperature)+'&deg;'
    
	currentObj.temp = temp_str;
	currentObj.feelslike = feel_str;
    
    if(current_summary.length > 45)
      currentObj.summaryClass = 'fe_small';
	else currentObj.summaryClass = '';
    
    currentObj.summary = current_summary;
	
    if(f.currently.windSpeed) {
      var wind_speed = Math.round(f.currently.windSpeed);
      
      if(wind_speed != 0 && f.currently.windBearing)
        wind_speed += ' '+speed_units+' ('+wind_bearing_to_str(f.currently.windBearing)+')'
      else
        wind_speed += ' '+speed_units
      
      currentObj.wind = 'Wind: '+wind_speed;
    }
    
    currentObj.icon = get_skycon(skycon_type(f.currently.icon));
	
	return currentObj;
  }
  
  // Build the list of days
  var build_daily = function(f) {
	var dailyObj = [],
		day_strs = [],
		today = new Date(),
		today_i = today.getDay(),
		month_i = today.getMonth(),
		date_i = today.getDate(),
		days = f.daily.data,
		num_days = Math.max(6, days.length),
		day,
		temp_span,
		max_temp_height = 65,
		high_temp = -Infinity,
		low_temp = Infinity;
        
        if (!is_mobile) {
            day_strs = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        } else {
            day_strs = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        }
        
    // find weekly high and low temps
    for(var i = 0; i < num_days; i++) {
        day = days[i];
        if(day.temperatureMax > high_temp) {
            high_temp = day.temperatureMax;
        }
        if(day.temperatureMin < low_temp) {
            low_temp = day.temperatureMin;
        }
    }
    // figure out the temp span now that we have highs and lows
    temp_span = high_temp - low_temp;

    // store daily values
    for(var i = 0,tmp_date; i < num_days; i++) (function(i) {
	  dailyObj[i] = days[i];
	  day = days[i];
      
      tmp_date = new Date();
	  tmp_date.setDate(date_i+i);
	  dailyObj[i].date = tmp_date.toDateString().substr(4,6);
      dailyObj[i].day = i == 0 ? 'Today' : day_strs[(today_i+i)%7];
      dailyObj[i].highTemp = Math.round(day.temperatureMax)+'&deg;';
      dailyObj[i].lowTemp = Math.round(day.temperatureMin)+'&deg;';
      dailyObj[i].icon = get_skycon(skycon_type(days[i].icon));
      dailyObj[i].tempBar = {
        height: max_temp_height * (day.temperatureMax - day.temperatureMin) / temp_span,
        top: max_temp_height * (high_temp - day.temperatureMax) / temp_span
      };
	  
    })(i);
	
	return dailyObj;
  }
  
  // Build any weather alerts or warnings
  var build_alerts = function(f) {    
    if(!f.alerts || !f.alerts.length) {
      return "";
    }
    
    var alert_message;
    for(var i = 0; i < f.alerts.length; i++) {
      if (f.alerts[i].title.match(/Special Weather Statement/i) ||
         f.alerts[i].title.match(/Advisory/i) ||
         f.alerts[i].title.match(/Statement/i))
        continue;
      
      alert_message = f.alerts[i];
      break;
    }

    if(alert_message)
      return '<a href="'+alert_message.uri+'" class="fe_alert" target="_blank"><span class="fe_icon--flag">&#9873;</span> '+alert_message.title+'</a>';
  }
  
  // Go!
  weatherData.current = build_currently(r);
  weatherData.alerts = build_alerts(r);
  weatherData.daily = build_daily(r);
  weatherData.activeUnit = unit_labels[units].temperature;
  weatherData.city = r.flags['ddg-location'];

  // build the header text:
  weatherData.header = weatherData.city ? 'Weather for ' + weatherData.city : 'Weather';

  // if there's alerts add them to the end:
  if (weatherData.alerts) {
      weatherData.header += ' ' + weatherData.alerts;
  }

  // structure the data differently for mobile and desktop views
  if (is_mobile) {
    spiceData = weatherData;
  } else {
    spiceData = [weatherData.current, weatherData.daily[0], weatherData.daily[1], weatherData.daily[2], weatherData.daily[3], weatherData.daily[4], weatherData.daily[5], weatherData.daily[6]];
  }

  var other_unit = unit_labels[units].temperature === 'F' ? 'C' : 'F';
  var altMeta = '<a id="fe_temp_switch"><span id="fe_fahrenheit">&deg;F</span> / <span id="fe_celsius">&deg;C</span></a>';

  // Render/Display
    Spice.add({
        id: 'forecast',
        name: 'Weather',

        data: spiceData,

        signal: "high",

        meta: {
            heading: weatherData.header,
            sourceUrl: 'http://forecast.io/#/f/'+r.latitude+','+r.longitude,
            sourceName: 'Forecast.io',
            altMeta: altMeta,
            variableTileWidth: true
        },

        templates: {
            item_custom: Spice.forecast.forecast_item,
            detail_mobile: Spice.forecast.forecast_detail_mobile
        }

    });

  var convertTemp = function(unit, d){
    if (unit === 'C') {
      return (d-32)*(5/9);
    } else if (unit === 'F') {
      return d*(9/5) + 32;
    }
  }

  var updateTempSwitch = function(other_unit){
    if (other_unit === "F"){
      $('#fe_fahrenheit').removeClass('gray').addClass('bold');
      $('#fe_celsius').removeClass('bold').addClass('gray');
    } else {
      $('#fe_celsius').removeClass('gray').addClass('bold');
      $('#fe_fahrenheit').removeClass('bold').addClass('gray');
    }
  }

  updateTempSwitch(unit_labels[units].temperature);

  //when we press the small button, switch the temperature units
  $('#fe_temp_switch').click(function(){
    //initialize the temperatures with the API data
    var temps = {};
    temps.current = r.currently.temperature;
    temps.feelslike = r.currently.apparentTemperature;
    temps.daily = $.map(r.daily.data, function(e){
      return {'tempMin': e.temperatureMin, 'tempMax': e.temperatureMax};
    });

    //if they want the units that aren't by the API, calculate the new temps
    if (other_unit !== unit_labels[units].temperature) {
      temps.current = convertTemp(other_unit, temps.current);
      temps.feelslike = convertTemp(other_unit, temps.feelslike);
      temps.daily = $.map(temps.daily, function(e){
        var tempMin = convertTemp(other_unit, e.tempMin),
            tempMax = convertTemp(other_unit, e.tempMax);
        return {'tempMin': tempMin, 'tempMax': tempMax};
      });
    }
    //insert the new temps in the html
    var $link = $(this);
    if (is_mobile){
      $('.fe_currently').find('.fe_temp_str').html(Math.round(temps.current) + '&deg;');
      $('.fe_day--bar').each(function(i){
        var day = temps.daily[i],
            $this = $(this);

        $this.find('.fe_high_temp').html(Math.round(day.tempMax) + '&deg;');
        $this.find('.fe_low_temp').html(Math.round(day.tempMin) + '&deg;');
      });
    } else {
      $('.fe_currently').find('.fe_temp_str').html(Math.round(temps.current) + '&deg;');
      $('.fe_day').each(function(i){
        var day = temps.daily[i],
            $this = $(this);

        $this.find('.fe_high_temp').html(Math.round(day.tempMax) + '&deg;');
        $this.find('.fe_low_temp').html(Math.round(day.tempMin) + '&deg;');
      });
    }

    updateTempSwitch(other_unit);
    other_unit = (other_unit === 'F') ? 'C' : 'F';
  });
}
