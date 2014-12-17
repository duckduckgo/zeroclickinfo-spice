function ddg_spice_forecast(r) {
    'use strict';

    // Exit if we've got a bad forecast
    if (!r || !r.hourly || !r.hourly.data || !r.daily || !r.daily.data || !r.flags['ddg-location']) {
        return Spice.failed('forecast');
    }

    var weatherData = {},
        spiceData,

        // Get the query.
        // We could actually use DDG.get_query() here, but we'd have
        // to strip all the unnecessary stuff that we don't need, and that
        // Forecast.pm already does for us.
        script = $('[src*="/js/spice/forecast/"]')[0],
        source = $(script).attr('src'),
        matches = source.match(/forecast\/([^\/]+)\/?(.*)/),
        query = decodeURIComponent(matches[1]),
        current_location = matches[2],

        // Pass flags['ddg-location'] to DDG.stringsRelevant to check
        // if the result is relevant to our query.
        /*var relevant_location = DDG.stringsRelevant(r.flags['ddg-location'].toLowerCase(), query, undefined, 2);

        // Exit if it's not the current location that we're looking for,
        // not the area code, e.g., 07871, and if it's not relevant.
        if(!current_location && !(/\d/).test(query) && !relevant_location) {
        return Spice.failed('forecast');
        }*/

        // Set up some stuff we'll need
        //$container = $('#zci-forecast'),  // #spice_forecast'
        
        // use svg if it's supported and we need it (high pixel density)
        iconFiletype = (Modernizr.svg === true && (DDG.is2x || DDG.is3x)) ? 'svg' : 'png', 
        iconPath = '/assets/weather/',
        unit_labels = {
            'us': {speed: 'mph', temperature: 'F'},
            'si': {speed: 'm/s', temperature: 'C'},
            'ca': {speed: 'km/h', temperature: 'C'},
            'uk': {speed: 'mph', temperature: 'C'},
            'uk2': {speed: 'mph', temperature: 'C'}
        },

        // Check if the unit that we got is actually in the hash.
        // If the API changes the r.flags or r.flags.units, it will break everything.
        units = (r.flags && (r.flags.units in unit_labels && r.flags.units)) || 'us',
        availableIcons = [
            'rain', 'snow', 'sleet', 'wind', 'fog', 'cloudy', 'partly-cloudy-day',
            'partly-cloudy-night', 'clear-day', 'clear-night', 'hail', 'thunderstorm', 'tornado'
        ],
        uom = unit_labels[units].temperature === 'F' ? 'F' : 'C',
        altMeta = '<a class="fe_temp_switch tx-clr--dk2"><span id="fe_fahrenheit">&deg;F</span> / <span id="fe_celsius">&deg;C</span></a>';

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

    function getIcon(type) {
        return {
            'icon': type,
            'path': iconPath,
            'file': iconFiletype
        };
    }

    function getIconType(icon) {
        if ($.inArray(icon, availableIcons) === -1) {
            icon = 'cloudy';
        }
        return icon;
    }

    // Convert a wind bearing in degrees to a string
    function wind_bearing_to_str(bearing) {
        var wind_i = Math.round(bearing / 45);
        return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'][wind_i];
    }

    // Build the current conditions
    function build_currently(f) {
        var now = new Date().getTime() / 1000,
            hourly = f.hourly.data,
            current_summary = f.currently.summary,
            fCurrently = f.currently,
            speed_units = unit_labels[units].speed,
            feel_str,
            currentObj = {},
            temp_direction = 0,
            i,
            hourlyLength = hourly.length,
            wind_speed;

        currentObj.isCurrent = 1;
        // If the next-hour summary is interesting enough (and we're not on mobile), use that instead
        if (!is_mobile && f.minutely && !f.minutely.summary.match(/ for the hour\.$/)) {
            current_summary = f.minutely.summary;
        }

        // Find the first hourly point in the future, so we can figure out
        // if the temperature is rising or falling
        for (i = 0; i < hourlyLength; i++) {
            if (hourly[i].time < now) {
                continue;
            }
            temp_direction = (hourly[i].temperature > fCurrently.temperature) ? 1 : -1;
            break;
        }

        i = '<span class="fe_temp_str">'+Math.round(fCurrently.temperature)+'&deg;</span>'

        /*
        if(temp_direction > 0)
          i += ' <span class="fe_dir">and rising</span>'
        else if(temp_direction < 0)
          i += ' <span class="fe_dir">and falling</span>'
        */
        if (fCurrently.apparentTemperature) {
            feel_str = 'Feels like ' + Math.round(fCurrently.apparentTemperature) + '&deg;'
        }

        currentObj.temp = i;
        currentObj.feelslike = feel_str;

        if (current_summary.length > 45) {
            currentObj.summaryClass = 'fe_small';
        }
        else {
            currentObj.summaryClass = '';
        }

        currentObj.summary = current_summary;

        if (fCurrently.windSpeed) {
            wind_speed = Math.round(fCurrently.windSpeed);

            if (wind_speed !== 0 && fCurrently.windBearing) {
                wind_speed += ' ' + speed_units + ' (' + wind_bearing_to_str(fCurrently.windBearing) + ')'
            }
            else {
                wind_speed += ' ' + speed_units
            }
            currentObj.wind = 'Wind: ' + wind_speed;
        }

        currentObj.icon = getIcon(getIconType(fCurrently.icon));

        return currentObj;
    }

    // Build the list of days
    function build_daily(f) {
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
            low_temp = Infinity,
            i,
            tmp_date;

            if (!is_mobile) {
                day_strs = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            }
            else {
                day_strs = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
            }

        // find weekly high and low temps
        for (i = 0; i < num_days; i++) {
            day = days[i];
            if (day.temperatureMax > high_temp) {
                high_temp = day.temperatureMax;
            }
            if (day.temperatureMin < low_temp) {
                low_temp = day.temperatureMin;
            }
        }

        // figure out the temp span now that we have highs and lows
        temp_span = high_temp - low_temp;

        // store daily values
        for(i = 0; i < num_days; i++) {
            daily(i);
        }
        
        function daily(i) {
            dailyObj[i] = days[i];
            day = days[i];

            tmp_date = new Date();
            tmp_date.setDate(date_i + i);
            dailyObj[i].date = tmp_date.toDateString().substr(4, 6);
            dailyObj[i].day = i === 0 ? 'Today' : day_strs[(today_i + i) % 7];
            dailyObj[i].highTemp = Math.round(day.temperatureMax) + '&deg;';
            dailyObj[i].lowTemp = Math.round(day.temperatureMin) + '&deg;';
            dailyObj[i].icon = getIcon(getIconType(day.icon));
            dailyObj[i].tempBar = {
                height: max_temp_height * (day.temperatureMax - day.temperatureMin) / temp_span,
                top: max_temp_height * (high_temp - day.temperatureMax) / temp_span
            };
        }

        return dailyObj;
    }

    // Build any weather alerts or warnings
    function build_alerts(f) {    
        if (!f.alerts || !f.alerts.length) {
          return '';
        }

        var alert_message,
            i,
            alerts = f.alerts,
            alertsLength = alerts.length,
            alertTitle;

        for (i = 0; i < alertsLength; i++) {
            alertTitle = alerts[i].title;
            if (alertTitle.match(/Special Weather Statement/i) ||
                alertTitle.match(/Advisory/i) ||
                alertTitle.match(/Statement/i)) {
                continue;
            }

            alert_message = alerts[i];
            break;
        }

        if (alert_message) {
            return '<a href="' + alert_message.uri + '" class="fe_alert" target="_blank"><span class="fe_icon--flag">&#9873;</span> ' + alert_message.title + '</a>';
        }
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
    }
    else {
        spiceData = [weatherData.current, weatherData.daily[0], weatherData.daily[1], weatherData.daily[2], weatherData.daily[3], weatherData.daily[4], weatherData.daily[5], weatherData.daily[6]];
    }

    function helper(obj, options) {
        obj.size = options && options.hash && options.hash.size || '40px';
        return DDG.exec_template(Spice.forecast.forecast_icons, obj);
    }
    
    // Render/Display
    Spice.registerHelper('forecast_icon', helper);

    Spice.add({
        id: 'forecast',
        name: 'Weather',
        data: spiceData,
        signal: 'high',
        meta: {
            heading: weatherData.header,
            sourceUrl: 'http://forecast.io/#/f/' + r.latitude + ',' + r.longitude,
            sourceName: 'Forecast.io',
            altMeta: altMeta,
            variableTileWidth: true
        },
        templates: {
            item_custom: Spice.forecast.forecast_item,
            detail_mobile: Spice.forecast.forecast_detail_mobile
        }
    });

    // convert temperature to specified unit
    function convertTemp(unit, d) {
        return unit === 'C' ? (d - 32) * (5 / 9) : d * (9 / 5) + 32;
    }

    function convertSpeed(from, to, val) {
        // http://en.wikipedia.org/wiki/Miles_per_hour#Conversions
        var conversionFactors = {
            'mph-m/s': 0.4471,
            'm/s-mph': 2.237,
            'mph-km/h': 1.609,
            'km/h-mph': 0.6214
        };
        return val * conversionFactors[from + '-' + to];
    }

    // update the style of the F/C (make one bold and the other grayed out)
    function updateTempSwitch(new_unit) {
        if (new_unit === 'F') {
            $('#fe_fahrenheit').removeClass('tx-clr--lt3').addClass('is-active');
            $('#fe_celsius').removeClass('is-active').addClass('tx-clr--lt3');
        }
        else {
            $('#fe_celsius').removeClass('tx-clr--lt3').addClass('is-active');
            $('#fe_fahrenheit').removeClass('is-active').addClass('tx-clr--lt3');
        }
    }

    function updateUnitOfMeasure() {

        function dailyMapAPI(e) {
            return {
                'tempMin': e.temperatureMin,
                'tempMax': e.temperatureMax
            };
        }

        function dailyMapCalc(e) {
            return {
                'tempMin': convertTemp(uom, e.tempMin),
                'tempMax': convertTemp(uom, e.tempMax)
            };
        }

        // initialize the temperatures with the API data
        var temps = {
                current: r.currently.temperature,
                feelslike: r.currently.apparentTemperature,
                daily: $.map(r.daily.data, dailyMapAPI),
                wind: r.currently.windSpeed
            },

            //decide which wind speed unit they want
            given_wind_uom = unit_labels[units].speed,
            wind_uom,
            day_class = is_mobile ? '.fe_day--bar' : '.fe_day';

        // if they want the units that aren't given by the API, calculate the new temps
        if (uom !== unit_labels[units].temperature) {
            temps.current = convertTemp(uom, temps.current);
            temps.feelslike = convertTemp(uom, temps.feelslike);
            temps.daily = $.map(temps.daily, dailyMapCalc);
        }

        if (uom === 'F') {
            wind_uom = 'mph';
        }
        else if (given_wind_uom === 'mph') {
            // when the user switches from a given F -> C, we assume they want m/s
            // TODO: make this smarter somehow
            wind_uom = 'm/s';
        }
        else {
            wind_uom = given_wind_uom;
        }

        if (wind_uom !== given_wind_uom){
            temps.wind = convertSpeed(given_wind_uom, wind_uom, temps.wind);
        }

        // insert the new temps in the html
        function doInsert(i) {
            var day = temps.daily[i],
                $this = $(this);
            $this.find('.fe_high_temp').html(Math.round(day.tempMax) + '&deg;');
            $this.find('.fe_low_temp').html(Math.round(day.tempMin) + '&deg;');
        }

        $('.fe_currently').find('.fe_temp_str').html(Math.round(temps.current) + '&deg;');
        $(day_class).each(doInsert);
        $('.fe_currently').find('.fe_wind').html('Wind: ' + Math.round(temps.wind) + ' ' + wind_uom + ' ('+wind_bearing_to_str(r.currently.windBearing)+')');

        updateTempSwitch(uom);
    }

    // if the metric setting is enabled and the API returned temps in F, switch to 'C':
    if (!DDG.settings.isDefault('kaj')) {
        uom = DDG.settings.get('kaj') === 'm' ? 'C' : 'F';
        updateUnitOfMeasure();
    }
    else {
        updateTempSwitch(uom);
    }

    function tempSwitchClick() {
        uom = uom === 'F' ? 'C' : 'F';
        updateUnitOfMeasure();

        // update the setting so we remember this choice going forward:
        DDG.settings.set('kaj', uom === 'C' ? 'm' : 'u', { saveToCloud: true });
    }

    // when we press the small button, switch the temperature units
    $('.fe_temp_switch').click(tempSwitchClick);
}
