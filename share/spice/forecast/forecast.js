(function(env){
  "use strict";
  env.ddg_spice_forecast = function(api_result){

    // Exit if we've got a bad forecast
    if(!api_result || !api_result.hourly || !api_result.hourly.data || !api_result.daily || !api_result.daily.data || !api_result.flags['ddg-location']) {
      return Spice.failed('forecast');
    }

    // Set up some stuff we'll need
    var weatherData = {},
        spiceData,
        iconFiletype = 'png',
        iconPath = '/assets/weather/',
        units = (api_result.flags && api_result.flags.units) || 'us',
        unit_labels = {
          'us': {speed: 'mph', temperature: 'F'},
          'si': {speed: 'm/s', temperature: 'C'},
          'ca': {speed: 'km/h', temperature: 'C'},
          'uk': {speed: 'mph', temperature: 'C'},
          'uk2': {speed: 'mph', temperature: 'C'}
        },
        units = api_result.flags && api_result.flags.units;

    // Check if the unit that we got is actually in the hash.
    // If the API changes the api_result.flags or api_result.flags.units, it will break everything.
    if(!(units in unit_labels)) {
        units = 'us';
    }
    // use svg if it's supported and we need it (high pixel density)
    if (Modernizr.svg == true && (DDG.is2x || DDG.is3x)) {
      iconFiletype = 'svg';
    }

    var availableIcons = [
      'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day',
      'partly-cloudy-night', 'clear-day', 'clear-night', 'hail', 'thunderstorm', 'tornado'
    ];

    var getIcon = function(type) {
      return { 'icon': type, 'path': iconPath, 'file': iconFiletype }
    };

    var getIconType = function(icon) {
      if ($.inArray(icon, availableIcons) === -1) {
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
      var now = moment().unix(),
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
      if(f.currently.apparentTemperature) {
        feel_str = 'Feels like '+Math.round(f.currently.apparentTemperature)+'&deg;'
      }

      currentObj.temp = temp_str;
      currentObj.feelslike = feel_str;

      if(current_summary.length > 45) {
        currentObj.summaryClass = 'fe_small';
      } else {
        currentObj.summaryClass = '';
      }

      currentObj.summary = current_summary;

      if(f.currently.windSpeed) {
        var wind_speed = Math.round(f.currently.windSpeed);

        if(wind_speed != 0 && f.currently.windBearing) {
          wind_speed += ' '+speed_units+' ('+wind_bearing_to_str(f.currently.windBearing)+')'
        } else {
          wind_speed += ' '+speed_units
        }
        currentObj.wind = 'Wind: '+wind_speed;
      }

      currentObj.icon = getIcon(getIconType(f.currently.icon));

      if(f.currently.humidity) {
        currentObj.humidity = 'Humidity: ' + (f.currently.humidity * 100) + '%';
      }

      if(f.currently.precipProbability) {
        currentObj.precipitation = 'Precipitation: ' + (f.currently.precipProbability * 100) + '%';
      }

      return currentObj;
    };

    var build_daily = function(f) {
      var dailyObj = [],
          today = moment(),
          days = f.daily.data,
          num_days = Math.max(6, days.length),
          day,
          temp_span,
          max_temp_height = 65,
          high_temp = -Infinity,
          low_temp = Infinity;

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

        tmp_date = moment(today).add(i, 'days');
        dailyObj[i].date = tmp_date.format("MMM D");        
        dailyObj[i].highTemp = Math.round(day.temperatureMax)+'&deg;';
        dailyObj[i].lowTemp = Math.round(day.temperatureMin)+'&deg;';
        dailyObj[i].icon = getIcon(getIconType(days[i].icon));
        dailyObj[i].tempBar = {
          height: max_temp_height * (day.temperatureMax - day.temperatureMin) / temp_span,
          top: max_temp_height * (high_temp - day.temperatureMax) / temp_span
        };
        
        if (i == 0) { 
            dailyObj[i].day = 'Today';
        } else if (is_mobile) {
            dailyObj[i].day = tmp_date.format("ddd").toUpperCase();
        } else {
            dailyObj[i].day = tmp_date.format("dddd");
        }

      })(i);

      return dailyObj;
    };

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

      if(alert_message){
        return '<a href="'+alert_message.uri+'" class="fe_alert  tx-clr--red" target="_blank"><span class="ddgsi fe_icon--alert">!</span>'+alert_message.title+'</a>';
      }
    };

    DDG.require('moment.js', function(){
      // Go!
      weatherData.current = build_currently(api_result);
      weatherData.alerts = build_alerts(api_result);
      weatherData.daily = build_daily(api_result);
      weatherData.activeUnit = unit_labels[units].temperature;
      weatherData.city = api_result.flags['ddg-location'];

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

      var uom = unit_labels[units].temperature === 'F' ? 'F' : 'C',
          altMeta = '<a id="fe_temp_switch" class="tx-clr--dk2"><span id="fe_fahrenheit">&deg;F</span> / <span id="fe_celsius">&deg;C</span></a>';

      // Render/Display
      Spice.registerHelper("forecast_icon", function(obj, options) {
        obj.size = options && options.hash && options.hash.size || "40px";
        return DDG.exec_template(Spice.forecast.forecast_icons,obj);
      });

      Spice.add({
          id: 'forecast',
          name: 'Weather',
          data: spiceData,
          signal: "high",
          meta: {
              sourceUrl: 'http://forecast.io/#/f/'+api_result.latitude+','+api_result.longitude,
              sourceName: 'Forecast.io',
              primaryText: weatherData.header,
              secondaryText: altMeta,

              itemsWidthVaries: true
          },

          templates: {
              item: Spice.forecast.forecast_item,
              detail_mobile: Spice.forecast.forecast_detail_mobile
          }
      });

    //convert temperature to specified unit
    var convertTemp = function(unit, d){
      if (unit === 'C') {
        return (d-32)*(5/9);
      } else if (unit === 'F') {
        return d*(9/5) + 32;
      }
    };

    var convertSpeed = function(from, to, val){
      // http://en.wikipedia.org/wiki/Miles_per_hour#Conversions
      var conversionFactors = {
        'mph-m/s': 0.4471,
        'm/s-mph': 2.237,
        'mph-km/h': 1.609,
        'km/h-mph': 0.6214
      };
      return val * conversionFactors[from + '-' + to];
    };

    //update the style of the F/C (make one bold and the other grayed out)
    var updateTempSwitch = function(new_unit){
      if (new_unit === "F"){
        $('#fe_fahrenheit').removeClass('tx-clr--lt3').addClass('is-active');
        $('#fe_celsius').removeClass('is-active').addClass('tx-clr--lt3');
      } else {
        $('#fe_celsius').removeClass('tx-clr--lt3').addClass('is-active');
        $('#fe_fahrenheit').removeClass('is-active').addClass('tx-clr--lt3');
      }
    };

    var updateUnitOfMeasure = function() {
      //initialize the temperatures with the API data
      var temps = {
        current: api_result.currently.temperature,
        feelslike: api_result.currently.apparentTemperature,
        daily: $.map(api_result.daily.data, function(e){
          return {'tempMin': e.temperatureMin, 'tempMax': e.temperatureMax};
        }),
        wind: api_result.currently.windSpeed
      };

      //if they want the units that aren't given by the API, calculate the new temps
      if (uom !== unit_labels[units].temperature) {
        temps.current = convertTemp(uom, temps.current);
        temps.feelslike = convertTemp(uom, temps.feelslike);
        temps.daily = $.map(temps.daily, function(e){
          var tempMin = convertTemp(uom, e.tempMin),
              tempMax = convertTemp(uom, e.tempMax);
          return {'tempMin': tempMin, 'tempMax': tempMax};
        });
      }

      //decide which wind speed unit they want
      var given_wind_uom = unit_labels[units].speed,
          wind_uom;

      if (uom === 'F'){
        wind_uom = 'mph';
      } else if (given_wind_uom === 'mph'){
        //when the user switches from a given F -> C, we assume they want m/s
        //TODO: make this smarter somehow
        wind_uom = 'm/s';
      } else {
        wind_uom = given_wind_uom;
      }

      if (wind_uom !== given_wind_uom){
        temps.wind = convertSpeed(given_wind_uom, wind_uom, temps.wind);
      }

      //insert the new temps in the html
      var day_class = is_mobile ? '.fe_day--bar' : '.fe_day';

      $('.fe_currently').find('.fe_temp_str').html(Math.round(temps.current) + '&deg;');
      $(day_class).each(function(i){
        var day = temps.daily[i],
            $this = $(this);
        $this.find('.fe_high_temp').html(Math.round(day.tempMax) + '&deg;');
        $this.find('.fe_low_temp').html(Math.round(day.tempMin) + '&deg;');
      });
      $('.fe_currently').find('.fe_wind').html('Wind: ' + Math.round(temps.wind) + ' ' + wind_uom +
        ' ('+wind_bearing_to_str(api_result.currently.windBearing)+')');

      updateTempSwitch(uom);
    };

    // if the metric setting is enabled and the API returned temps in F, switch to 'C':
    if (!DDG.settings.isDefault('kaj')) {
        uom = DDG.settings.get('kaj') === 'm' ? 'C' : 'F';
        updateUnitOfMeasure();
    } else {
        updateTempSwitch(uom);
    }

    //when we press the small button, switch the temperature units
    $('#fe_temp_switch').click( function() {
        uom = uom === 'F' ? 'C' : 'F';

        updateUnitOfMeasure()

        // update the setting so we remember this choice going forward:
        DDG.settings.set('kaj', uom === 'C' ? 'm' : 'u', { saveToCloud: true });
    });
  });
  };

}(this));
