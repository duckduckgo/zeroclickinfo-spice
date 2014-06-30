(function(env) {
    'use strict';
    env.ddg_spice_timer = function(api_result) {
        Spice.add({
            id: 'timer',
            name: 'Timer',
            data: {},
            meta: {
                sourceName: 'Timer',
                itemType: 'timer'
            },
            templates: {
                detail: Spice.timer.timer,
                wrap_detail: 'base_detail'
            }
        });
        
        function timeInSeconds() {
            return  1 * $('#timer-secs').val() 
                    + 60 * $('#timer-mins').val() 
                    + 3600 * $('#timer-hours').val();
        }

        function timer_alarm_triggered() {
            var remainingDuration = timeInSeconds() - 1;
            $('#timer-secs').val(remainingDuration%60);
            $('#timer-mins').val(Math.floor(remainingDuration/60));
            $('#timer-hours').val(Math.floor(remainingDuration/3600));
            
            if(remainingDuration <= 0)
            {
                alert("ALARTM");
                return;
            }
            
            setTimeout(timer_alarm_triggered, 1000);
        }
        $("button.timer__btn.go").click(function(e){
            console.log("clicked");
            e.preventDefault();
            
            setTimeout(timer_alarm_triggered, 1000);
        });
    }
})(this);