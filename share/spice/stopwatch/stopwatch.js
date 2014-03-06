function ddg_spice_stopwatch(api_result) { //api_result should be removed in production
  Spice.render({
    header1          : "Stopwatch",
    template_normal  : 'stopwatch',
    force_big_header : true,
    force_no_fold    : true
  });

  var running = false,
      start_time = null,
      last_lap = null,
      interval_id = null,
      lap_num = 1,
      old_time = 0;

  //add zeros to the end of the number
  function padZeros(n, len){
    var s = n.toString();
    while (s.length < len){
      s = '0' + s;
    }
    return s;
  }

  //go from a time in ms to human-readable
  function formatTime(t){
    // var hrs = Math.floor(t / (1000*60*60));
    // t = t % (1000*60*60);
    var mins = Math.floor(t / (1000*60));
    t = t % (1000*60);
    var secs = Math.floor(t / 1000);
    t = (t % 1000).toString().substring(0, 2);
    return padZeros(mins, 2) + ":" + padZeros(secs, 2) + '.' + padZeros(t, 2);
  }

  //called on every interval
  function updateStopwatch(){
    var t = new Date().getTime() - start_time + old_time;
    $('#total-time').html(formatTime(t));
    $('#current-time').html(formatTime(t-last_lap))
    return t;
  }

  //trigger for lap button (extracted so the stop button trigger can access it)
  function addLap(){
    if (!running) return;
    var current_time = updateStopwatch();
    var current_lap = current_time - last_lap;
    $('#split-list').prepend('<tr><td>' + lap_num + '</td><td>' + formatTime(current_lap) + '</td><td>' + $('#total-time').html() + '</td></tr>');
    $('#split-list').removeClass('hidden');
    last_lap = current_time;
    lap_num++;
    return current_time;
  }

  //when we click the start button, we save the time we started and start updating it
  $('.btn-wrapper').on('click', '.btn.start', function(){
    if (running) return;
    running = true;
    start_time = new Date().getTime();
    if (!last_lap) last_lap = 0;
    interval_id = setInterval(updateStopwatch, 10);

    $(this).html('STOP').removeClass('start').addClass('stop');
    $('#reset-btn').prop('disabled', true);
    $('#lap-btn').prop('disabled', false);
  });

  //stop the stopwatch and save the time in case we start it again
  $('.btn-wrapper').on('click', '.btn.stop', function(){
    if (!running) return;
    //add a lap (useful for people who want to stop and get a split at the same time)
    old_time = addLap();
    running = false;
    clearInterval(interval_id);

    $(this).html('START').removeClass('stop').addClass('start');
    $('#reset-btn').prop('disabled', false);
    $('#lap-btn').prop('disabled', true);
  });

  //reset everything
  $('#reset-btn').click(function(){
    running = false;
    old_time = 0;
    last_lap = null;
    lap_num = 1;
    $('#total-time').html(formatTime(0));
    $('#current-time').html(formatTime(0));
    $('#split-list > tbody').children().remove();
    clearInterval(interval_id);

    $(this).prop('disabled', true);
    $('#split-list').addClass('hidden');
  });

  //add a split (the time that was on the watch) and lap (time between laps)
  $('#lap-btn').click(addLap);

  //hide the source link
  if ($('#spice_stopwatch').length){
    $('#zero_click_more_at_wrap').css('display', 'none');
  }
}
