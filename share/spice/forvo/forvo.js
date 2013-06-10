nrj("soundmanager2/script/soundmanager2-nodebug-jsmin.js", true);

var ddg_spice_forvo = function(api_result) {
    "use strict";

    // api_result.items can be either an array or an object.
    // Forvo returns either an array-like object or an actual array.
    // {0: "...", 1: "...", 2: "..."} or ["...", "...", "..."].
    if($.isArray(api_result.items)) {
        api_result.isArray = true;
    } else {
        api_result.isArray = false;
    }

    // Display the Spice plug-in.
    Spice.render({
        data             : api_result,
        header1          : "Pronunciations (Forvo)",
        source_url       : "http://www.forvo.com/",
        source_name      : "Forvo",
        template_normal  : "forvo",
        force_big_header : true
    });

    // This gets called when the sound is finished playing 
    // or when another player is playing. It basically just resets the look of the player.
    var clearPlayer = function() {
        var li = $("ul.playlist li");
        li.removeClass();
        li.addClass("sm2_stopped");
        soundManager.stopAll();
    };

    // Loads and plays the audio file.
    var isFailed = false;
    var playSound = function(anchor) {
        soundManager.stopAll();

        if(isFailed) {
            setTimeout(function() {
                clearPlayer();
            }, 1000);
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
    window.SM2_DEFER = true;
    var isLoaded = false;
    var isLoading = false;
    var soundSetup = function(anchor) {
        window.soundManager = new SoundManager();
        soundManager.url = "/soundmanager2/swf/";
        soundManager.flashVersion = 9;
        soundManager.useFlashBlock = false;
        soundManager.useHTML5Audio = false;
        soundManager.beginDelayedInit();
        soundManager.ontimeout(function() {
            isFailed = true;
            isLoaded = true;
            clearPlayer();
        })
        soundManager.onready(function() {
            playSound(anchor);
            isLoaded = true;
        });
    };

    // This controls our player.
    var last_id;
    ddg_spice_forvo.player = function(element) {
        var li = $(element);
        var anchor = li.children();

        // Get the sound
        var current_id = anchor.attr("id");
        var sound;
        
        // Make sure only one player is playing at any one time.
        if(!last_id) {
            last_id = current_id;
        } else if(last_id !== current_id) {
            last_id = current_id;
            clearPlayer();
        }

        // Check if it is already playing.
        // If it is, pause it.
        if(li.hasClass("sm2_playing") && isLoaded) {
            li.removeClass();
            li.addClass("sm2_paused");

            sound = soundManager.getSoundById(current_id);
            sound.pause();
        // If it's not playing, it's probably paused.
        // Let's play it.
        } else if(li.hasClass("sm2_paused")){
            li.removeClass();
            li.addClass("sm2_playing");

            sound = soundManager.getSoundById(current_id);
            sound.resume();
        // If it's neither paused nor playing, we should load the audio and play it.
        } else {
            // Load SoundManager2 if it hasn't already.
            if(!isLoaded && !isLoading) {
                isLoading = true;
                soundSetup(anchor);
            // If SoundManager already loaded, we should just play the sound.
            } else if(isLoaded) {
                playSound(anchor);
            }
            
            li.removeClass();
            li.addClass("sm2_playing");
        }
    };
};

// Make sure we display only five items.
Handlebars.registerHelper("list", function(items, options) {
    "use strict";

    var out = "";
    for(var i = 0; i < items.length && i < 5; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});

// The sex (returned as either "m" or "f") should be expanded.
Handlebars.registerHelper("sex", function(sex) {
    "use strict";

    if(sex === "m") {
        return ", Male";
    } else {
        return ", Female";
    }
});

// Make sure we display only five items.
// This helper is for objects.
Handlebars.registerHelper("listObjects", function(items, options) {
    "use strict";

    var hasOwn = Object.prototype.hasOwnProperty,
        index = 0,
        out = "";

    for(var data in items) {
        if(hasOwn.call(items, data)) {
            if(index < 5) {
                out += options.fn(items[data]);
            }
            index += 1;
        }
    }

    return out;
});