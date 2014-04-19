function ddg_spice_timer(api_result) {
  Spice.render({
    header1          : "Timer",
    template_normal  : 'timer',
    force_big_header : true,
    force_no_fold    : true
  });

  //add zeros to the end of the number
  function padZeros(n, len){
    var s = n.toString();
    while (s.length < len){
      s = '0' + s;
    }
    return s;
  }

  var time_left, last_update, update_int
      started = false,
      $minute_input = $('#minute_input'),
      $second_input = $('#second_input'),
      $timer = $('#timer'),
      $reset_btn = $('#reset_btn');

  //go from a time in ms to human-readable
  function formatTime(t){
    var mins = Math.floor(t / (1000*60));
    t = t % (1000*60);
    var secs = Math.floor(t / 1000);
    return padZeros(mins, 2) + ":" + padZeros(secs, 2);
  }

  function updateTimer(){
    time_left -= new Date().getTime() - last_update;
    if (time_left <= 0){
      clearInterval(update_int);
      $timer.html('00:00');
      alert('Timer finished');
      //TODO: Sound?
    } else {
      $timer.html(formatTime(time_left));
      last_update = new Date().getTime();
    }
  }

  //parse the input if the timer was just set and start it
  $('.btn-wrapper').on('click', '.btn.start', function(e){
    if (!started){
      var start_mins = parseInt($minute_input.val()) || 0;
      var start_secs = parseInt($second_input.val()) || 0;

      $minute_input.val('');
      $second_input.val('');

      //invalid input
      if ((!start_secs && !start_mins) || start_mins > 60) {
        return;
      }
      started = true;
      time_left = start_mins * (60*1000) + start_secs*1000;
    }

    last_update = new Date().getTime();
    update_int = setInterval(updateTimer, 100);

    $('#timer_input').addClass('hidden');
    $('#timer_display').removeClass('hidden');
    $reset_btn.prop('disabled', false);

    $(this).removeClass('start').addClass('pause').html('PAUSE');
  });

  //pause the timer
  $('.btn-wrapper').on('click', '.btn.pause', function(){
    clearInterval(update_int);
    $(this).removeClass('pause').addClass('start').html('START');
  });

  //reset everything
  $reset_btn.click(function(){
    $(this).prop('disabled', true);
    $('#timer_input').removeClass('hidden');
    $('#timer_display').addClass('hidden');
    clearInterval(update_int);
    started = false;
    $('.btn.pause').removeClass('pause').addClass('start').html('START');
  });

  //make sure the bang dropdown doesn't trigger
  $('.time-input').keydown(function(event){
    event.stopPropagation();
  });

  //hide the source link
  if ($('#spice_timer').length){
    $('#zero_click_more_at_wrap').hide();

    $('#zero_click_wrapper2 #zero_click_abstract').attr('style',
      'padding: 0 !important; margin: 4px 0 0 0 !important');
  }
}

//ddg_spice_timer(); //uncomment in production
