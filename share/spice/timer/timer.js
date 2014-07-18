/*
Audio file is Notification Up II by FoolBoyMedia (http://www.freesound.org/people/FoolBoyMedia/sounds/234563/)
Used with permission.
License: CC BY-NC 3.0 http://creativecommons.org/licenses/by-nc/3.0/
*/

(function (env) {
    "use strict";

    var started = false;

    env.ddg_spice_timer = function(api_result) {
        Spice.add({
            id: "timer",
            name: "Timer",
            signal: "high",
            data: {},
            meta: {
                sourceName: "Timer",
                itemType: "timer"
            },
            templates: {
                detail: Spice.timer.timer,
                wrap_detail: 'base_detail'
            },
            //wait for the spice to load before displaying things
            //this makes sure the divs display at the right time so the layout doesn't break
            onShow: function(){
                if (!started){
                    $('#timer_input').css('display', 'inline-block');
                }
                $('#timer_buttons').css('display', 'inline-block');
            }
        });

        //add zeros to the end of the number
        function padZeros(n, len){
            var s = n.toString();
            while (s.length < len){
                s = '0' + s;
            }
            return s;
        }

        function parseQueryForTime(){
            var q = DDG.get_query().replace('timer', '').replace('online', ''),
                regex = new RegExp(/(\d+) ?(min|sec|h)/),
                time = 0;

            while (true){
                var match = regex.exec(q);
                if (match){
                    var val = parseInt(match[1]),
                        unit = match[2];
                    if (unit === 'h') time += val*60*60;
                    else if (unit === 'min') time += val*60;
                    else if (unit === 'sec') time += val;
                    q = q.replace(match[0], '');
                } else {
                    break;
                }
            }
            return time;
        }

        var time_left, last_update, update_int,
            $minute_input = $('#minute_input'),
            $second_input = $('#second_input'),
            $timer = $('#timer'),
            $timer_input = $('#timer_input'),
            $timer_display = $('#timer_display'),
            $reset_btn = $('#reset_btn'),
            $startstop_btn = $('#startstop_btn'),
            $done_modal = $('#done_modal'),
            soundUrl = DDG.get_asset_path('timer', 'alarm.mp3'),
            enteredTime = parseQueryForTime(),
            oldTitle = document.title;

        //enter the time from the query into the boxes
        if (enteredTime) {
            if (Math.floor(enteredTime / 60) > 0) {
                $minute_input.val(Math.floor(enteredTime / 60));
            }
            $second_input.val(padZeros(enteredTime % 60, 2));
            $startstop_btn.prop('disabled', false);
        }

        //go from a time in ms to human-readable
        function formatTime(t){
            t = Math.ceil(t/1000);
            var hours = Math.floor(t / (60*60));
            t = t % (60*60);
            var mins = Math.floor(t / 60);
            t = t % 60;
            var secs = Math.floor(t);
            if (hours > 0) return hours + ":" + padZeros(mins, 2) + ":" + padZeros(secs, 2);
            return padZeros(mins, 2) + ":" + padZeros(secs, 2);
        }

        //play the alarm sound
        function playLoopingSound(){
            DDG.require('audio', function(player){
                function loop(){
                    player.play('alarm-sound', soundUrl, {autoPlay: true, onfinish: loop}); //play the sound
                }
                loop();
                $('#done_ok_btn').click(function(){player.stop('alarm-sound')}); //stop it when the modal is dismissed
            });
        }

        //called every tenth of a second (for accuracy purposes)
        //pop up the modal and play the sound if done
        function updateTimer(){
            time_left -= new Date().getTime() - last_update;
            if (time_left <= 0){
                clearInterval(update_int);
                $timer.html('00:00');
                $done_modal.show();
                playLoopingSound();
                document.title = '[Done!] - ' + oldTitle;
            } else {
                $timer.html(formatTime(time_left));
                //put the time left in the title (so people can switch tabs)
                document.title = '[' + formatTime(time_left) + '] - ' + oldTitle;
                last_update = new Date().getTime();
            }
        }

        function startTimer(){
            if (!started){
                var start_mins = parseInt($minute_input.val()) || 0;
                var start_secs = parseInt($second_input.val()) || 0;

                $minute_input.val('');
                $second_input.val('');

                //invalid input
                if (!start_secs && !start_mins) {
                    return;
                }
                if (start_mins > 999) {
                    start_mins = 999;
                    start_secs = 59;
                }
                if (start_secs > 59) start_secs = 59;
                started = true;
                time_left = start_mins * (60*1000) + start_secs*1000;
            }

            last_update = new Date().getTime();
            updateTimer();
            update_int = setInterval(updateTimer, 100);

            $timer_input.hide();
            $timer_display.css('display', 'inline-block');
            $reset_btn.prop('disabled', false);

            $startstop_btn.removeClass('timer__start').addClass('timer__pause').html('PAUSE');
        }

        //parse the input if the timer was just set and start it
        $('.btn-wrapper').on('click', '.timer__btn.timer__start', startTimer);

        //pause the timer
        $('.btn-wrapper').on('click', '.timer__btn.timer__pause', function(){
            clearInterval(update_int);
            $startstop_btn.removeClass('timer__pause').addClass('timer__start').html('START');
        });

        function resetTimer(){
            $timer_display.hide();
            $timer_input.css('display', 'inline-block');
            clearInterval(update_int);
            started = false;
            $('.timer__btn.timer__pause').removeClass('timer__pause').addClass('timer__start').html('START');
            $reset_btn.prop('disabled', true);
            $startstop_btn.prop('disabled', true);
            document.title = oldTitle;
        }

        //reset everything
        $reset_btn.click(resetTimer);

        //dismiss the modal and reset when "OK" is pressed
        $('#done_ok_btn').click(function(){
            $done_modal.hide();
            resetTimer();
        })
        
        $('.timer__time-input').keydown(function(event){
            //make sure the bang dropdown doesn't trigger
            event.stopPropagation();

            //start the timer if they hit enter
            if (event.which == 13) startTimer();
        });

        $('.timer__time-input').keyup(function(){
            //enable the button if a number was entered
            if ($minute_input.val() || $second_input.val()){
                $startstop_btn.prop('disabled', false);
            } else {
                $startstop_btn.prop('disabled', true);
            }
        });

        //called when input is inserted, forcing numeric input
        function numericOnly(){
            this.value = this.value.replace(/\D/g, '');
        }

        //reject typing any keys that aren't numbers
        function typeNumericOnly(e){
            if (e.shiftKey === true){
                return (e.which == 9);
            }
            return !(e.which > 57 || e.which == 32) || (e.which >= 96 && e.which <= 105); //numpad
        }

        $('.timer__time-input').keydown(typeNumericOnly).change(numericOnly).click(numericOnly);
    }
}(this));

ddg_spice_timer();
