function ddg_spice_forecast(r) {
  
  var weatherData = {};
  
  // Exit if we've got a bad forecast
  if(!r || !r.hourly || !r.hourly.data || !r.daily || !r.daily.data || !r.flags['ddg-location']) {
    return;
  }

  // Get the query.
  // We could actually use DDG.get_query() here, but we'd have
  // to strip all the unnecessary stuff that we don't need, and that
  // Forecast.pm already does for us.
  var script = $('[src*="/js/spice/forecast/"]')[0];
  var source = $(script).attr('src');
  var query = source.match(/forecast\/([^\/]+)/)[1];
  query = decodeURIComponent(query);

  // Pass flags['ddg-location'] to DDG.stringsRelevant to check
  // if the result is relevant to our query.
  var relevant_location = DDG.stringsRelevant(r.flags['ddg-location'], query, undefined, 2);

  // Exit if it's not an area code, e.g., 07871, and if it's relevant.
  if(!(/^\d+$/).test(query) && !relevant_location) {
    return;
  }
  
  // Set up some stuff we'll need
  var $container = $('#spice_forecast'),
      units = (r.flags && r.flags.units) || 'us',
      unit_labels = {
        'us': {speed: 'mph', temperature: 'F'},
        'si': {speed: 'm/s', temperature: 'C'},
        'ca': {speed: 'km/h', temperature: 'C'},
        'uk': {speed: 'mph', temperature: 'C'},
      }
  
  // Skycons (static version of these: http://darkskyapp.github.io/skycons/)
  var set_skycons = function(elem_id, type) {
    var $elem = $('#'+elem_id),
        $img = $('<img />').attr('id', $elem.attr('id'))
                           .attr('class', $elem.attr('class'))
                           .attr('src', '/iu/?u=http://forecastsite.s3.amazonaws.com/skycons/'+type+'.gif') // DDG
                           .css({
                              'width': $elem.width(),
                              'height': $elem.height()
                            })
    
    $elem.replaceWith($img)
  };
  
  var get_skycon = function(type) {
	return 'http://forecastsite.s3.amazonaws.com/skycons/'+type+'.gif';
  };
  
  var skycon_type = function(icon) {
    if(icon === 'rain')
      return 'rain'
    else if(icon === 'snow')
      return 'snow'
    else if(icon === 'sleet')
      return 'sleet'
    else if(icon === 'hail')
      return 'sleet'
    else if(icon === 'wind')
      return 'wind'
    else if(icon === 'fog')
      return 'fog'
    else if(icon === 'cloudy')
      return 'cloudy'
    else if(icon === 'partly-cloudy-day')
      return 'partly_cloudy_day'
    else if(icon === 'partly-cloudy-night')
      return 'partly_cloudy_night'
    else if(icon === 'clear-day')
      return 'clear_day'
    else if(icon === 'clear-night')
      return 'clear_night'
    else
      return 'cloudy'
  }
  
  // Convert a wind bearing in degrees to a string
  var wind_bearing_to_str = function(bearing) {
    var wind_i = Math.round(bearing / 45)
    return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'][wind_i]
  }
  
  // Build the current conditions
  var build_currently = function(f) {
    var now = new Date().getTime() / 1000,
        hourly = f.hourly.data,
        current_summary = f.currently.summary,
        speed_units = unit_labels[units].speed,
		feel_str,
		currentObj = {};
    
	currentObj.isCurrent = 1;
    // If the next-hour summary is interesting enough, use that instead
    if(f.minutely && !f.minutely.summary.match(/ for the hour\.$/))
      current_summary = f.minutely.summary
    
    // Find the first hourly point in the future, so we can figure out
    // if the temperature is rising or falling
    var temp_direction = 0
    for(var i = 0; i < hourly.length; i++) {
      if(hourly[i].time < now) continue
      temp_direction = hourly[i].temperature > f.currently.temperature ? 1 : -1
      break
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
      var wind_speed = Math.round(f.currently.windSpeed)
      
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
	var dailyObj = [];
	//$daily_container = $container.find('.fe_daily')
    //$daily_container.empty()
    
	var day_strs = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		today = new Date(),
		today_i = today.getDay(),
		month_i = today.getMonth(),
		date_i = today.getDate(),
		days = f.daily.data,
		num_days = Math.max(6, days.length),
		day;
   
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
  
  // Render/Display
    Spice.render({
        id: 'forecast',
        name: 'Weather',

        data: [weatherData.current, weatherData.daily[0], weatherData.daily[1], weatherData.daily[2], weatherData.daily[3], weatherData.daily[4], weatherData.daily[5], weatherData.daily[6]],

        signal: "high",

        // ideally this happens inside of Spice.render()?
        meta: {
            heading: r.flags['ddg-location'] ? 'Weather for '+r.flags['ddg-location'] + weatherData.alerts : 'Weather' + weatherData.alerts,
            sourceUrl: 'http://forecast.io/#/f/'+r.latitude+','+r.longitude,
            sourceName: 'Forecast.io',
            altMeta: 'Temperatures in '+unit_labels[units].temperature+'&deg;'
        },

        view: 'Tiles',

        templates: {
            item: Spice.forecast.forecast_item,
            summary: Spice.forecast.forecast
        }

    });
}
