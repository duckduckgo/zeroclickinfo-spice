function ddg_spice_stopwatch(api_result) {
    //api_result should be removed in production
    Spice.add({
        id: "stopwatch",
        name: "Stopwatch",
        data: {},
        meta: {
            sourceName: "Stopwatch",
            itemType: "stopwatch"
        },
        templates: {
            detail: Spice.stopwatch.stopwatch,
            wrap_detail: "base_detail"
        }
    });
    var running = !1, start_time = null, last_lap = null, interval_id = null, lap_num = 1, old_time = 0, $total_time = $("#total_time"), $current_time = $("#current_time"), $split_list = $("#split_list"), $lap_btn = $("#lap_btn"), $reset_btn = $("#reset_btn");
    //add zeros to the end of the number
    function padZeros(n, len) {
        var s = n.toString();
        while (s.length < len) {
            s = "0" + s;
        }
        return s;
    }
    //go from a time in ms to human-readable
    function formatTime(t) {
        // var hrs = Math.floor(t / (1000*60*60));
        // t = t % (1000*60*60);
        var mins = Math.floor(t / 6e4);
        t %= 6e4;
        var secs = Math.floor(t / 1e3);
        return t = padZeros((t % 1e3).toString(), 3).substring(0, 2), padZeros(mins, 2) + ":" + padZeros(secs, 2) + "." + t;
    }
    //called on every interval
    function updateStopwatch() {
        var t = new Date().getTime() - start_time + old_time;
        return $total_time.html(formatTime(t)), $current_time.html(formatTime(t - last_lap)), 
        t;
    }
    //trigger for lap button (extracted so the stop button trigger can access it)
    function addLap() {
        if (!running) {
            return;
        }
        var current_time = updateStopwatch();
        var current_lap = current_time - last_lap;
        return $split_list.prepend('<tr><td class="lap-num">' + lap_num + '</td><td class="lap-time">' + formatTime(current_lap) + '</td><td class="lap-time">' + $total_time.html() + "</td></tr>"), 
        $split_list.removeClass("hidden"), last_lap = current_time, lap_num++, current_time;
    }
    //hide the source link and remove the padding
    if (//when we click the start button, we save the time we started and start updating it
    $(".btn-wrapper").on("click", ".stopwatch__btn.start", function() {
        if (running) {
            return;
        }
        if (running = !0, start_time = new Date().getTime(), !last_lap) {
            last_lap = 0;
        }
        interval_id = setInterval(updateStopwatch, 10), $(this).html("STOP").removeClass("start").addClass("stop"), 
        $reset_btn.prop("disabled", !1), $lap_btn.prop("disabled", !1);
    }), //stop the stopwatch and save the time in case we start it again
    $(".btn-wrapper").on("click", ".stopwatch__btn.stop", function() {
        if (!running) {
            return;
        }
        //add a lap (useful for people who want to stop and get a split at the same time)
        old_time = addLap(), running = !1, clearInterval(interval_id), $(this).html("START").removeClass("stop").addClass("start"), 
        $reset_btn.prop("disabled", !1), $lap_btn.prop("disabled", !0);
    }), //reset everything
    $reset_btn.click(function() {
        running = !1, old_time = 0, last_lap = null, lap_num = 1, $total_time.html(formatTime(0)), 
        $current_time.html(formatTime(0)), $split_list.find("tbody").children().remove(), 
        clearInterval(interval_id), $(".stopwatch__btn.stop").removeClass("stop").addClass("start").html("START"), 
        $(this).prop("disabled", !0), $split_list.addClass("hidden");
    }), //add a split (the time that was on the watch) and lap (time between laps)
    $lap_btn.click(addLap), $("#spice_stopwatch").length) {
        $("#zero_click_more_at_wrap").hide(), $("#zero_click_wrapper2 #zero_click_abstract").attr("style", "padding: 0 !important; margin: 4px 0 0 0 !important");
    }
}

ddg_spice_stopwatch();