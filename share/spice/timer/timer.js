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
    
    Timer = function (number, startingTime) {
        this.running = false;
        this.paused = false;
        this.name = "Timer " + number;
        this.destroyed = false;

        // dom setup
        this.$element = $(Spice.timer.timer());

        this.$nameDisplay = this.$element.find('.name_display');
        this.$nameInput = this.$element.find(".name_input");

        this.$timeInput = this.$element.find(".time_input");
        this.$hourInput = this.$element.find(".time_input .hours");
        this.$minuteInput = this.$element.find(".time_input .minutes");
        this.$secondInput = this.$element.find(".time_input .seconds");

        this.$timeDisplay = this.$element.find('.time_display');
        this.$hoursMinutesDisplay = this.$element.find('.time_display .hours_minutes');
        this.$secondsDisplay = this.$element.find('.time_display .seconds');

        this.$resetBtn = this.$element.find('.corner_btn.reset');
        this.$closeBtn = this.$element.find('.corner_btn.close');
        this.$addMinuteBtn = this.$element.find('.corner_btn.add_minute');

        this.$startStopBtn = this.$element.find('.play_pause a');

        // interaction
        this.$nameInput.keyup(this.handleNameInput.bind(this));
        this.$element.find(".time_input").keyup(this.handleTimeInput.bind(this));
        this.$resetBtn.click(this.handleResetClick.bind(this));
        this.$startStopBtn.click(this.handleStartStopClick.bind(this));
        this.$addMinuteBtn.click(this.handleAddMinuteClick.bind(this));
        this.$closeBtn.click(this.handleCloseClick.bind(this));

        // set starting time if it was passed
        if (startingTime) {
            this.setStartingTime(startingTime);

            var hours, minutes;

            hours = Math.floor(startingTime / 3600);
            startingTime %= 3600;
            minutes = Math.floor(startingTime / 60);
            startingTime %= 60;

            this.$hourInput.val(padZeros(hours, 2));
            this.$minuteInput.val(padZeros(minutes, 2));
            this.$secondInput.val(padZeros(startingTime, 2));
        } else {
            this.setStartingTime(0);
        }
    };

    $.extend(Timer.prototype, {
        start: function () {
            // if this is the first time timer has started
            // set the timer vals from the inputs
            if (!this.running) {
                this.getStartingTimeFromInput();
                this.name = this.$nameInput.val();
                this.running = true;
            }

            this.paused = false;

            this.$closeBtn.hide();
            this.$timeInput.hide();
            this.$timeDisplay.show();
            this.$resetBtn.hide();
            this.$addMinuteBtn.show();

            this.$startStopBtn.html('║');
        },
        setStartingTime: function (startingTime) {
            // starting time is in seconds, convert to ms
            this.totalTime = startingTime * 1000;
            this.timeLeft = startingTime * 1000;

            // enable start button if time is > 0
            this.$startStopBtn.prop('disabled', !startingTime);
        },
        getStartingTimeFromInput: function () {
            var startHrs = parseInt(this.$hourInput.val(), 10) || 0,
                startMins = parseInt(this.$minuteInput.val(), 10) || 0,
                startSecs = parseInt(this.$secondInput.val(), 10) || 0;

            // make sure values are sane

            // if over 99 hrs, set to max time possible
            if (startHrs > 99) {
                startHrs = 99;
                startMins = 59;
                startSecs = 59;
            }

            // disallow more than 60 mins or secs
            if (startMins > 59) {
                startMins = 59;
            }

            if (startSecs > 59) {
                startSecs = 59;
            }

            this.setStartingTime(startHrs * 3600 + startMins * 60 + startSecs);
        },
        handleStartStopClick: function (e) {
            e.preventDefault();

            // total time hasn't been set yet - do nothing
            if (this.totalTime === 0) {
                return;
            }

            if (this.running && !this.paused) {
                this.pause();
            } else if (this.timeLeft === 0) {
                this.destroy();
            } else {
                this.start();
            }
        },
        handleNameInput: function (e) {
            //make sure the bang dropdown doesn't trigger
            e.stopPropagation();

            var keycode = e.which || e.keycode,
                $input = $(e.currentTarget);

            // if enter, update timer name
            if (keycode === 13) {
                this.name = $input.val();
                this.$nameInput.hide();
                this.$nameDisplay.show();
            }
        },
        handleTimeInput: function (e) {
            //make sure the bang dropdown doesn't trigger
            e.stopPropagation();

            var keycode = e.which || e.keycode,
                $input = $(e.currentTarget);

            // replace any non-digit characters
            $input.val($input.val().replace(/\D/g, ''));

            // start if enter was pressed
            if (keycode === 13) {
                this.start();
            }
        },
        renderTime: function () {
            var hours, minutes, seconds;

            seconds = this.timeLeft / 1000;

            hours = Math.floor(seconds / 3600);

            seconds %= 3600;

            minutes = Math.floor(seconds / 60);
            seconds = Math.floor(seconds % 60);

            this.$hoursMinutesDisplay.html(padZeros(hours, 2) + ":" + padZeros(minutes, 2));
            this.$secondsDisplay.html(padZeros(seconds, 2));
        },
        update: function (timeDifference) {
            if (this.paused || !this.running) {
                return;
            }

            this.timeLeft -= timeDifference;

            if (this.timeLeft <= 0) {
                this.timeLeft = 0;
                this.running = false;
                playLoopingSound();
                this.$startStopBtn.html("&times;");
            }

            this.renderTime();
        },
        handleResetClick: function (e) {
            e.preventDefault();

            this.setStartingTime(0);

            this.$timeDisplay.hide();
            this.$timeInput.show();

            this.$resetBtn.hide();
            this.$addMinuteBtn.hide();
            this.$closeBtn.show();

            this.running = false;

            this.$startStopBtn.html('►');
        },
        handleAddMinuteClick: function (e) {
            e.preventDefault();

            this.timeLeft += 60 * 1000;
            this.totalTime += 60 * 1000;

            // trigger time re-render
            // (in case it's paused)
            this.renderTime();
        },
        handleCloseClick: function (e) {
            e.preventDefault();

            this.destroy();
        },
        pause: function () {
            this.paused = true;
            this.$startStopBtn.html('►');
            this.$resetBtn.show();
        },
        destroy: function () {
            this.$element.remove();
            this.destroyed = true;
        }
    });

    // TODO: changing of document title
    // TODO: what to do with the modal? some other way of signaling that a timer's done?

    env.ddg_spice_timer = function(api_result) {
        
        function onShow() {
            var lastUpdate = new Date().getTime(),
                enteredTime = parseQueryForTime(),
                $dom = Spice.getDOM("timer"),
                $addTimerBtn = $dom.find("#add_timer_btn"),
                oldTitle = document.title,
                // start with one timer initially
                firstTimer = new Timer(1, enteredTime),
                timers = [firstTimer];

            function updateTimers() {
                var timeDifference = new Date().getTime() - lastUpdate;

                // update all timers
                for (var i = 0; i < timers.length; i++) {
                    timers[i].update(timeDifference);
                }

                // do a sweep for any destroyed timers
                for (var i = 0; i < timers.length; i++) {
                    if (timers[i].destroyed) {
                        timers.splice(i, 1);
                        // very very very small chance of two timers destroyed in the same loop
                        // so just break
                        break;
                    }
                }

                lastUpdate = new Date().getTime();
            }

            firstTimer.$element.insertBefore($addTimerBtn.parent());

            setInterval(updateTimers, 100);

            $addTimerBtn.click(function (e) {
                e.preventDefault();

                var timer = new Timer(timers.length + 1);
                timer.$element.insertBefore($addTimerBtn.parent());
                timers.push(timer);
            });
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
