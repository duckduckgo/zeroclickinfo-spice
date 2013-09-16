var StaticSkycons = function() {
  var OBJ = {}
  
  OBJ.play = OBJ.pause = function(){}
  
  OBJ.set = function(elem_id, type) {
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
  
  return OBJ
}

StaticSkycons.RAIN = 'rain'
StaticSkycons.SNOW = 'snow'
StaticSkycons.SLEET = 'sleet'
StaticSkycons.WIND = 'wind'
StaticSkycons.FOG = 'fog'
StaticSkycons.CLOUDY = 'cloudy'
StaticSkycons.PARTLY_CLOUDY_DAY = 'partly_cloudy_day'
StaticSkycons.PARTLY_CLOUDY_NIGHT = 'partly_cloudy_night'
StaticSkycons.CLEAR_DAY = 'clear_day'
StaticSkycons.CLEAR_NIGHT = 'clear_night'



var ForecastEmbed = function(opts) {
  
  var OBJ = {},
      $container,
      loading_skycons, skycons
  
  
  var initialize = function() {
    
    // Create container
    $container = $('\
      <div id="forecast_embed" class="fe_container"> \
        <div class="fe_title" style="display:none"> \
          <span class="fe_location"> \
            <span></span> \
          </span> \
           \
          <span class="fe_forecast_link"> \
            More at <a target="_blank" href="http://forecast.io">Forecast.io</a> \
          </span> \
        </div> \
         \
        <div class="fe_forecast"> \
          <div class="fe_currently"> \
            <canvas id="fe_current_icon" width="160" height="160" style="width:80px; height:80px"></canvas> \
            <div class="fe_temp"></div> \
            <div class="fe_summary"></div> \
            <div class="fe_wind"></div> \
          </div> \
           \
          <div class="fe_daily"></div> \
          <div style="clear:left"></div> \
        </div> \
         \
        <div class="fe_alert" style="display:none"></div> \
         \
        <div class="fe_loading" style="display:none"> \
          <canvas id="fe_loading_icon" width="100" height="100" style="width:50px; height:50px"></canvas> \
          Loading... \
        </div> \
      </div> \
    ')
    
    OBJ.elem = $container
    
    // Setup skycons
    if(opts.static_skycons)
      window.Skycons = StaticSkycons
    
    loading_skycons = new Skycons({color: opts.text_color || "#333"})
    skycons = new Skycons({color: opts.text_color || "#333"})
    
    // Set header
    if(opts.hide_header) {
      $container.find('.fe_title').remove()
    } else {
      $container.find('.fe_title .fe_location span').html(opts.title)
      $container.find('.fe_title').show()
    }
    
    // Set optional font
    if(opts.ff_name && opts.ff_url) {
      var s = document.createElement('style')
      s.type = "text/css"
      document.getElementsByTagName('head')[0].appendChild(s)
      var rule = 'font-family: '+opts.ff_name+'; src: url('+opts.ff_url+');'
      if(s.styleSheet)
        s.styleSheet.cssText = "@font-face {" + rule + "}"
      else
        s.innerHTML = "@font-face {" + rule + "}"
    }
    
    if(opts.font || opts.ff_name)
      $('body').css('font-family', opts.font || opts.ff_name)
    
    // Set text color
    if(opts.text_color) {
      $container.css('color', opts.text_color)
      $container.find('a').css('color', opts.text_color)
      $container.find('.fe_title').css('border-color', opts.text_color)
      $container.find('.fe_alert a').css('color', opts.text_color)
    }
  }
  
  var wind_bearing_to_str = function(bearing) {
    var wind_i = Math.round(bearing / 45)
    return ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'][wind_i]
  }
  
  var skycon_type = function(icon) {
    if(icon === 'rain')
      return Skycons.RAIN
    else if(icon === 'snow')
      return Skycons.SNOW
    else if(icon === 'sleet')
      return Skycons.SLEET
    else if(icon === 'hail')
      return Skycons.SLEET
    else if(icon === 'wind')
      return Skycons.WIND
    else if(icon === 'fog')
      return Skycons.FOG
    else if(icon === 'cloudy')
      return Skycons.CLOUDY
    else if(icon === 'partly-cloudy-day')
      return Skycons.PARTLY_CLOUDY_DAY
    else if(icon === 'partly-cloudy-night')
      return Skycons.PARTLY_CLOUDY_NIGHT
    else if(icon === 'clear-day')
      return Skycons.CLEAR_DAY
    else if(icon === 'clear-night')
      return Skycons.CLEAR_NIGHT
    
    return Skycons.CLOUDY
  }
  
  var build_currently = function(f) {
    var now = new Date().getTime() / 1000,
        hourly = f.hourly.data,
        current_summary = f.currently.summary,
        speed_units = ForecastEmbed.unit_labels[opts.units || 'us'].speed
    
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
    
    var temp_str = '<span class="fe_temp_str">'+Math.round(f.currently.temperature)+'&deg;</span><span class="fe_temp_unit">'+ForecastEmbed.unit_labels[opts.units || 'us'].temperature+'</span>'
    if(temp_direction > 0)
      temp_str += ' <span class="fe_dir">and rising.</span>'
    else if(temp_direction < 0)
      temp_str += ' <span class="fe_dir">and falling.</span>'
    
    if(f.currently.apparentTemperature)
      temp_str += ' <span class="fe_feelslike">Feels like '+Math.round(f.currently.apparentTemperature)+'&deg;'+'</span>'
    
    $container.find('.fe_currently .fe_temp').html(temp_str)
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
      skycons.set('fe_current_icon', skycon_type(f.currently.icon))
    }, 0)
  }
  
  
  var build_daily = function(f) {
    $daily_container = $container.find('.fe_daily')
    $daily_container.empty()
    
    var $day_template = $(
        '<div class="fe_day"> \
          <span class="fe_label">MON</span> \
          <canvas class="fe_icon" width="52" height="52" style="width:26px; height:26px" /> \
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
        'top': temp_top,
        'background-color': opts.color || '#333'
      })
      
      if(typeof FlashCanvas != 'undefined')
        FlashCanvas.initElement($day.find('canvas')[0])
      
      $day.find('.fe_icon').attr('id', 'fe_day_icon'+i)
      setTimeout(function(){skycons.set('fe_day_icon'+i, skycon_type(days[i].icon))}, 0)
      
      $day.appendTo($daily_container)
    })(i)
  }
  
  
  var build_alerts = function(f) {
    $alert = $container.find('.fe_alert').empty()
    
    if(!f.alerts || !f.alerts.length) {
      $alert.hide()
      return
    }
    
    var alert = f.alerts[0]
    $('<a target="_blank"></a>').html('<span class="fe_icon">&#9873;</span> '+alert.title).attr('href', alert.uri).appendTo($alert)
    
    $container.addClass('alert')
    $alert.show()
  }
  
  
  OBJ.loading = function(show) {
    if(show) {
      loading_skycons.set('fe_loading_icon', Skycons.PARTLY_CLOUDY_DAY)
      loading_skycons.play()
      $container.find('.fe_loading').show()
    } else {
      $container.find('.fe_loading').hide()
      loading_skycons.pause()
    }
  }
  
  OBJ.build = function(f) {
    $container.find('.fe_title .fe_forecast_link a').attr('href', 'http://forecast.io/#/f/'+f.latitude+','+f.longitude)
    build_currently(f)
    build_daily(f)
    build_alerts(f)
    skycons.play()
  }
  
  
  initialize()
  
  return OBJ
}

ForecastEmbed.unit_labels = {
  'us': {speed: 'mph', temperature: 'F'},
  'si': {speed: 'm/s', temperature: 'C'},
  'ca': {speed: 'km/h', temperature: 'C'},
  'uk': {speed: 'mph', temperature: 'C'},
}

// -----------------------

function ddg_spice_forecast(r) {
  if(!r || !r.hourly || !r.hourly.data || !r.daily || !r.daily.data)
    return;
  
  var items = new Array(),
      units = r.flags && r.flags.units,
      embed = new ForecastEmbed({static_skycons: true, hide_header: true, units: units || 'auto'});
  
  embed.build(r);
  
  items[0] = new Array();
  items[0]['a'] = embed.elem[0];
  items[0]['h'] = r.flags['ddg-location'] ? 'Weather for '+r.flags['ddg-location'] : 'Weather';
  items[0]['s'] = 'Forecast.io';
  items[0]['u'] = 'http://forecast.io/f/#'+r.latitude+','+r.longitude;
  items[0]['force_no_fold'] = 1;
  
  nra(items);
}
