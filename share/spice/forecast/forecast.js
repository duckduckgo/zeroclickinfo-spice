function ddg_spice_forecast(r) {
  
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

  // Render the container elements
  Spice.render({
    data             : {},
    header1          : r.flags['ddg-location'] ? 'Weather for '+r.flags['ddg-location'] : 'Weather',
    source_url       : 'http://forecast.io/#/f/'+r.latitude+','+r.longitude,
    source_name      : 'Forecast.io',
    template_normal  : 'forecast',
    force_big_header : true,
    force_no_fold    : true,
  })
  
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
  }
  
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
        speed_units = unit_labels[units].speed
    
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
    
    var temp_str = '<span class="fe_temp_str">'+Math.round(f.currently.temperature)+'&deg;</span><span class="fe_temp_unit">'+unit_labels[units].temperature+'</span>'
    if(temp_direction > 0)
      temp_str += ' <span class="fe_dir">and rising</span>'
    else if(temp_direction < 0)
      temp_str += ' <span class="fe_dir">and falling</span>'
    
    if(f.currently.apparentTemperature)
      temp_str += ' <span class="fe_feelslike">Feels like '+Math.round(f.currently.apparentTemperature)+'&deg;'+'</span>'
    
    $container.find('.fe_currently .fe_temp').html(temp_str)
    
    if(current_summary.length > 45)
      $container.find('.fe_currently .fe_summary').addClass('fe_small')
    else
      $container.find('.fe_currently .fe_summary').removeClass('fe_small')
    
    $container.find('.fe_currently .fe_summary').html(current_summary)
    
    if(f.currently.windSpeed) {
      var wind_speed = Math.round(f.currently.windSpeed)
      
      if(wind_speed != 0 && f.currently.windBearing)
        wind_speed += ' '+speed_units+' ('+wind_bearing_to_str(f.currently.windBearing)+')'
      else
        wind_speed += ' '+speed_units
      
      $container.find('.fe_currently .fe_wind').html('Wind: '+wind_speed)
    }
    
    setTimeout(function() {
      set_skycons('fe_current_icon', skycon_type(f.currently.icon))
    }, 0)
  }
  
  // Build the list of days
  var build_daily = function(f) {
    $daily_container = $container.find('.fe_daily')
    $daily_container.empty()
    
    var $day_template = $(
        '<div class="fe_day"> \
          <span class="fe_label">MON</span> \
          <canvas class="fe_icon" /> \
          <div class="fe_temp_bar"> \
            <span class="fe_high_temp">72&deg;</span> \
            <span class="fe_low_temp">50&deg;</span> \
          </div> \
        </div>'),
        day_strs = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        today_i = new Date().getDay(),
        days = f.daily.data,
        num_days = Math.max(6, days.length),
        day, $day
    
    // First, find weekly high and low temps, for scaling
    var high_temp = -Infinity,
        low_temp = Infinity
    
    for(var i = 0; i < num_days; i++) {
      day = days[i]
      if(day.temperatureMax > high_temp) high_temp = day.temperatureMax
      if(day.temperatureMin < low_temp) low_temp = day.temperatureMin
    }
    
    // Now create each day element
    var max_temp_height = 82,
        temp_span = high_temp - low_temp,
        temp_height, temp_top
    
    for(var i = 0; i < num_days; i++) (function(i) {
      $day = $day_template.clone()
      day = days[i]
      
      temp_height = max_temp_height * (day.temperatureMax - day.temperatureMin) / temp_span
      temp_top = max_temp_height * (high_temp - day.temperatureMax) / temp_span
      
      $day.find('.fe_label').html(i == 0 ? 'Today' : day_strs[(today_i+i)%7])
      $day.find('.fe_high_temp').html(Math.round(day.temperatureMax)+'&deg;')
      $day.find('.fe_low_temp').html(Math.round(day.temperatureMin)+'&deg;')
      
      $day.find('.fe_temp_bar').css({
        'height': temp_height,
        'top': temp_top
      })
      
      $day.find('.fe_icon').attr('id', 'fe_day_icon'+i)
      setTimeout(function(){set_skycons('fe_day_icon'+i, skycon_type(days[i].icon))}, 0)

      if(day.temperatureMax && day.temperatureMin) { 
        $day.appendTo($daily_container)
      }
    })(i)
  }
  
  // Build any weather alerts or warnings
  var build_alerts = function(f) {
    $alert = $container.find('.fe_alert').empty()
    
    if(!f.alerts || !f.alerts.length) {
      $alert.hide()
      return
    }
    
    var alert_message
    for(var i = 0; i < f.alerts.length; i++) {
      if(f.alerts[i].title.match(/Special Weather Statement/i) ||
         f.alerts[i].title.match(/Advisory/i) ||
         f.alerts[i].title.match(/Statement/i))
        continue
      
      alert_message = f.alerts[i]
      break
    }

    if(!alert_message)
      return
    
    $('<a target="_blank"></a>').html('<span class="fe_icon">&#9873;</span> '+alert_message.title).attr('href', alert_message.uri).appendTo($alert)
    
    $container.addClass('alert')
    $alert.show()
  }
  
  // Go!
  build_currently(r)
  build_daily(r)
  build_alerts(r)
}
