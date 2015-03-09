/*
Audio file is Notification Up II by FoolBoyMedia (http://www.freesound.org/people/FoolBoyMedia/sounds/234563/)
Used with permission.
License: CC BY-NC 3.0 http://creativecommons.org/licenses/by-nc/3.0/
*/

(function (env) {
    'use strict';

    // helper methods

    // add zeros to beginning of string
    function padZeros(n, len) {
        var s = n.toString();
        while (s.length < len) {
            s = '0' + s;
        }
        return s;
    }

    // get time in seconds from query
    function parseQueryForTime() {
        var q = DDG.get_query().replace('timer', '').replace('online', '').replace('s','sec').replace('m','min'),
            regex = new RegExp(/([\d]+\.?[\d]*) ?(min|sec|h)/),
            time = 0,
            match,
            val,
            unit;

        while (true) {
            match = regex.exec(q);
            if (match) {
                val = parseFloat(match[1]);
                unit = match[2];
                if (unit === 'h') {
                    time += val * 60 * 60;
                }
                else if (unit === 'min') {
                    time += val * 60;
                }
                else if (unit === 'sec') {
                    val = Math.round(val);
                    time += val;
                }
                q = q.replace(match[0], '');
            } else {
                break;
            }
        }

        return (time <= MAX_TIME) ? time : MAX_TIME;
    }

    //go from a time in ms to human-readable
    function formatTime(t) {
        var hours, mins, secs;
        t = Math.ceil(t / 1000);
        hours = Math.floor(t / (60 * 60));
        t = t % (60 * 60);
        mins = Math.floor(t / 60);
        t = t % 60;
        secs = Math.floor(t);
        if (hours > 0) {
            return hours + ':' + padZeros(mins, 2) + ':' + padZeros(secs, 2);
        }
        return padZeros(mins, 2) + ':' + padZeros(secs, 2);
    }

    //play the alarm sound
    function playLoopingSound() {
        function requirePlayer(player) {
            player.play('alarm-sound', soundUrl, {
                autoPlay: true
            });
        }
        DDG.require('audio', requirePlayer);
    }

    var MAX_TIME = 59999, // => 999m59s
        soundUrl = DDG.get_asset_path('timer', 'alarm.mp3'),
        Timer;
    
    Timer = function (startingTime) {
        this.running = false;

        // dom setup
        this.$element = $(Spice.timer.timer());

        this.$minuteInput = this.$element.find(".minute_input");
        this.$secondInput = this.$element.find(".second_input");
        this.$timer = this.$element.find('.timer');
        this.$timerInput = this.$element.find('.timer_input');
        this.$timerDisplay = this.$element.find('.timer_display');
        this.$resetBtn = this.$element.find('.reset_btn');
        this.$startStopBtn = this.$element.find('.startstop_btn');

        // interaction
        this.$element.find("input").keyup(this.handleInput.bind(this));
        this.$resetBtn.click(this.reset.bind(this));
        this.$startStopBtn.click(this.start.bind(this));

        // set starting time if it was passed
        if (startingTime) {
            this.setStartingTime(startingTime);

            if (Math.floor(startingTime / 60) > 0) {
                this.$minuteInput.val(Math.floor(startingTime / 60));
            }
            this.$secondInput.val(padZeros(startingTime % 60, 2));
        } else {
            this.setStartingTime(0);
        }
    };

    $.extend(Timer.prototype, {
        start: function () {
            if (this.running) {
                return this.pause();
            }

            this.running = true;

            this.$timerInput.hide();
            this.$timerDisplay.css('display', 'inline-block');
            this.$resetBtn.prop('disabled', false);

            this.$startStopBtn.removeClass('timer__start').addClass('timer__pause').html('PAUSE');
        },
        setStartingTime: function (startingTime) {
            // starting time is in seconds, convert to ms
            this.startingTime = startingTime * 1000;
            this.timeLeft = startingTime * 1000;

            // enable start button if time is > 0
            this.$startStopBtn.prop('disabled', !startingTime);
        },
        getStartingTimeFromInput: function () {
            var startMins = parseInt(this.$minuteInput.val(), 10) || 0,
                startSecs = parseInt(this.$secondInput.val(), 10) || 0;

            //invalid input
            if (!startSecs && !startMins) {
                return;
            }
            if (startMins > 999) {
                startMins = 999;
                startSecs = 59;
            }
            if (startSecs > 59) {
                startSecs = 59;
            }

            this.setStartingTime(startMins * 60 + startSecs);
        },
        handleInput: function (e) {
            //make sure the bang dropdown doesn't trigger
            e.stopPropagation();

            var keycode = e.which || e.keycode,
                $input = $(e.currentTarget);

            // replace any non-digit characters
            $input.val($input.val().replace(/\D/g), '');

            // update starting time
            this.getStartingTimeFromInput();

            // start if enter was pressed
            if (keycode === 13) {
                this.start();
            }
        },
        update: function (timeDifference) {
            if (!this.running) {
                return;
            }

            this.timeLeft -= timeDifference;

            if (this.timeLeft <= 0) {
                this.stop();
                playLoopingSound();
            } else {
                this.$timer.html(formatTime(this.timeLeft));
            }
        },
        stop: function () {
            this.running = false;
            this.$timer.html('00:00');
        },
        reset: function () {
            this.setStartingTime(0);

            this.$timerDisplay.hide();
            this.$timerInput.css('display', 'inline-block');

            this.stop();

            $('.timer__btn.timer__pause').removeClass('timer__pause').addClass('timer__start').html('START');

            this.$resetBtn.prop('disabled', true);
            this.$startStopBtn.prop('disabled', true);
        },
        pause: function () {
            this.running = false;
            this.$startStopBtn.removeClass('timer__pause').addClass('timer__start').html('START');
        }
    });

    // TODO: changing of document title
    // TODO: what to do with the modal? some other way of signaling that a timer's done?

    env.ddg_spice_timer = function(api_result) {
        
        function onShow() {
            var lastUpdate = new Date().getTime(),
                enteredTime = parseQueryForTime(),
                oldTitle = document.title,
                // start with one timer initially
                firstTimer = new Timer(enteredTime),
                timers = [firstTimer];

            function updateTimers() {
                var timeDifference = new Date().getTime() - lastUpdate;

                for (var i = 0; i < timers.length; i++) {
                    timers[i].update(timeDifference);
                }

                lastUpdate = new Date().getTime();
            }

            Spice.getDOM("timer").prepend(firstTimer.$element);

            setInterval(updateTimers, 100);
        }

        Spice.add({
            id: 'timer',
            name: 'Timer',
            signal: 'high',
            data: {},
            meta: {
                sourceName: 'Timer',
                itemType: 'timer'
            },
            templates: {
                detail: Spice.timer.timer_wrapper,
                wrap_detail: 'base_detail'
            },

            //wait for the spice to load before displaying things
            //this makes sure the divs display at the right time so the layout doesn't break
            onShow: onShow
        });
        

    };
}(this));

ddg_spice_timer();
