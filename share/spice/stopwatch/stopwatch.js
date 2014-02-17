function ddg_spice_stopwatch(api_result) { //api_result should be removed in production
  Spice.render({
    header1          : "Stopwatch",
    template_normal  : 'stopwatch',
    force_big_header : true,
    force_no_fold    : true,
  });

  var running = false,
      start_time = null,
      last_lap = null,
      interval_id = null,
      old_time = 0;

  function padZeros(n, len){
    var s = n.toString();
    while (s.length < len){
      s = '0' + s
    }
    return s;
  }

  function formatTime(t){
    var hrs = Math.floor(t / (1000*60*60));
    t = t % (1000*60*60);
    var mins = Math.floor(t / (1000*60));
    t = t % (1000*60);
    var secs = Math.floor(t / 1000);
    t = t % 1000;
    return padZeros(hrs, 2) + ":" + padZeros(mins, 2) + ":" + padZeros(secs, 2) + '.' + padZeros(t, 3)
  }

  function updateStopwatch(){
    var t = new Date().getTime() - start_time + old_time;
    $('#nums').html(formatTime(t));
    return t;
  }

  $('#start-btn').on('click', function(){
    if (running) return;
    running = true;
    start_time = new Date().getTime();
    last_lap = start_time;
    interval_id = window.setInterval(updateStopwatch, 50);
  });

  $('#stop-btn').on('click', function(){
    if (!running) return;
    running = false;
    window.clearInterval(interval_id);
    old_time = updateStopwatch();
  });

  $('#reset-btn').on('click', function(){
    running = false;
    old_time = 0;
    $('#nums').html('00:00:00.000');
    $('#split-list').html('');
    window.clearInterval(interval_id);
  });

  $('#split-btn').on('click', function(){
    if (!running) return;
    updateStopwatch();
    $('#split-list').append('<li>' + $('#nums').html() + '</li>')
  });

  $('#lap-btn').on('click', function(){
    if (!running) return;
    updateStopwatch();
    var t = new Date().getTime() - last_lap;
    $('#split-list').append('<li>' + formatTime(t) + '</li>');
    last_lap = new Date().getTime();
  });

  //hide the source link
  if ($('#spice_stopwatch').length){
    $('#zero_click_more_at_wrap').css('display', 'none');
  }
}
