nrj("soundmanager2/script/soundmanager2-nodebug-jsmin.js", !0);

function ddg_spice_forvo(api_result) {
    "use strict";
    if (api_result.attributes.total < 1) {
        return;
    }
    var script = $('[src*="/js/spice/forvo/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/forvo\/([^\/]+)\/\w+/)[1];
    // Display the Spice plug-in.
    Spice.add({
        data: api_result,
        name: "Pronunciation",
        sourceUrl: "http://www.forvo.com/search/" + query,
        sourceName: "Forvo",
        id: "forvo",
        template_frame: "list",
        templates: {
            items: api_result.items,
            //list,
            item: Spice.forvo.forvo,
            show: 3,
            max: 5,
            type: "ul",
            use_alternate_template: !1
        }
    });
    // This gets called when the sound is finished playing
    // or when another player is playing. It basically just resets the look of the player.
    var clearPlayer = function() {
        var li = $(".spice2list_item");
        li.removeClass("sm2_playing"), li.removeClass("sm2_paused"), li.addClass("sm2_stopped"), 
        soundManager.stopAll();
    };
    // Loads and plays the audio file.
    var isFailed = !1;
    var playSound = function(anchor) {
        if (soundManager.stopAll(), isFailed) {
            setTimeout(function() {
                clearPlayer();
            }, 1e3);
        } else {
            var sound = soundManager.createSound({
                id: anchor.attr("id"),
                url: anchor.data("stream"),
                onfinish: function() {
                    clearPlayer();
                }
            });
            sound.play();
        }
    };
    // Initialize SoundManager2.
    window.SM2_DEFER = !0;
    var isLoaded = !1;
    var isLoading = !1;
    var soundSetup = function(anchor) {
        window.soundManager = new SoundManager(), soundManager.url = "/soundmanager2/swf/", 
        soundManager.flashVersion = 9, soundManager.useFlashBlock = !1, soundManager.useHTML5Audio = !1, 
        soundManager.beginDelayedInit(), soundManager.ontimeout(function() {
            isFailed = !0, isLoaded = !0, clearPlayer();
        }), soundManager.onready(function() {
            playSound(anchor), isLoaded = !0;
        });
    };
    // This controls our player.
    var last_id;
    ddg_spice_forvo.player = function() {
        var li = $(this);
        var anchor = li.find("a.forvo-audio");
        // Get the sound
        var current_id = anchor.attr("id");
        var sound;
        // Make sure only one player is playing at any one time.
        if (!last_id) {
            last_id = current_id;
        } else {
            if (last_id !== current_id) {
                last_id = current_id, clearPlayer();
            }
        }
        // Check if it is already playing.
        // If it is, pause it.
        if (li.hasClass("sm2_playing") && isLoaded) {
            li.removeClass("sm2_playing"), li.removeClass("sm2_stopped"), li.addClass("sm2_paused"), 
            sound = soundManager.getSoundById(current_id), sound.pause();
        } else {
            if (li.hasClass("sm2_paused")) {
                li.removeClass("sm2_playing"), li.removeClass("sm2_paused"), li.addClass("sm2_playing"), 
                sound = soundManager.getSoundById(current_id), sound.resume();
            } else {
                // Load SoundManager2 if it hasn't already.
                if (!isLoaded && !isLoading) {
                    isLoading = !0, soundSetup(anchor);
                } else {
                    if (isLoaded) {
                        playSound(anchor);
                    }
                }
                li.removeClass("sm2_playing"), li.removeClass("sm2_stopped"), li.addClass("sm2_playing");
            }
        }
    }, $(document).ready(function() {
        $(".spice2list_item").click(ddg_spice_forvo.player), // $(".spice2list_item").attr("class", "sm2_stopped");
        $(".spice2list_item").addClass("sm2_stopped");
    });
}

// The sex (returned as either "m" or "f") should be expanded.
Handlebars.registerHelper("forvo_sex", function(sex) {
    "use strict";
    if ("m" === sex) {
        return "Male";
    }
    return "Female";
});