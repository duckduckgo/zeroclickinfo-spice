// Description:
// Returns a list of streamable MP3s.
//
// Dependencies:
// Requires SoundManager2 and jQuery.
//
// Commands:
// soundcloud falloutboy

var ddg_spice_sound_cloud = function(api_result) {
    "use strict";

    // Get the tracks that are actually streamable.
    var context= [];
    for(var i = 0; i < api_result.length; i += 1) {
        if(api_result[i].streamable) {
            context.push(api_result[i]);
        }
    }

    // Exit if we don't have what we need.
    if(!api_result || context.length === 0) {
        return;
    }

    // Display the plugin.
    Spice.render({
        data                     : context,
        header1                  : "Sound Cloud",
        source_url               : "https://soundcloud.com/search?q=",
        source_name              : "SoundCloud",
        template_normal          : "sound_cloud",
        carousel_css_id          : "sound_cloud",
        template_frame           : "carousel",
        force_big_header         : true,
        carousel_items           : context,
        carousel_template_detail: "sound_cloud_details",
        force_no_fold            : 1
    });

    // Loads and plays the sound
    var playSound = function(element) {
        soundManager.stopAll();

        var sound = soundManager.createSound({
            // SoundManager2 doesn't like an ID that
            // starts with a non-numeric character.
            id: $(element).attr("id"),
            url: $(element).data("stream")
        });

        sound.play();
    }

    // Initialize SoundManager2.
    window.SM2_DEFER = true;
    var loaded = false;
    var loading = false;
    var soundSetup = function(element) {
        window.soundManager = new SoundManager();
        soundManager.url = "/soundmanager2/swf/";
        soundManager.flashVersion = 9;
        soundManager.useFlashBlock = false;
        soundManager.useHTML5Audio = false;
        soundManager.beginDelayedInit();
        soundManager.onready(function() {
            playSound(element);
            loaded = true;
        });
    };

    $("#ddgc_detail").prependTo("#sound_cloud");

    // Clicking on an image should stop the sound.
    $(".ddgc_item").click(function() {
        if(window.soundManager) {
            soundManager.stopAll();
        }
    });

    ddg_spice_sound_cloud.player = function(element) {
        var li = $(element).parent();
        var current_id = $(element).attr("id");
        var sound;

        // Check if it is already playing.
        // If it is, pause it.
        if(li.hasClass("sm2_playing") && loaded) {
            li.removeClass("sm2_playing");
            li.addClass("sm2_paused");

            sound = soundManager.getSoundById(current_id);
            sound.pause();
        // If it's not playing, it's probably paused.
        // Let's play it.
        } else if(li.hasClass("sm2_paused")){
            li.removeClass("sm2_paused");
            li.addClass("sm2_playing");

            sound = soundManager.getSoundById(current_id);
            sound.resume();
        } else {
            // Load SoundManager2. This JS file handles our audio.
            if(!loaded && !loading) {
                loading = true;
                $.getScript("/soundmanager2/script/soundmanager2.js", function() {
                    soundSetup(element);
                });
            // Only play the sound when the sound has loaded.   
            } else if(loaded) {
                playSound(element);
            }
            li.removeClass("sm2_stopped");
            li.addClass("sm2_playing");
        }
    };
};

Handlebars.registerHelper("chooseImage", function(artwork, avatar) {
    "use strict";

    return artwork || avatar;
});

Handlebars.registerHelper("toHttps", function(audio) {
    "use strict";
    if(audio) {
        return audio.replace(/^http:/, "https:");
    }
});