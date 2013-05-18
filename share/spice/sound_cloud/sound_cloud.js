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

    // Remove the tracks that aren't streamable.
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
        carousel_template_detail : "sound_cloud_details",
        force_no_fold            : 1
    });

    // Loads and plays the audio file.
    var playSound = function(anchor) {
        soundManager.stopAll();

        var sound = soundManager.createSound({
            // SoundManager2 doesn't like an ID that
            // starts with a non-numeric character.
            id: anchor.attr("id"),
            url: anchor.data("stream")
        });

        sound.play();
    }

    // Initialize SoundManager2.
    window.SM2_DEFER = true;
    var isLoaded = false;
    var isLoading = false;
    var soundSetup = function(anchor) {
        window.soundManager = new SoundManager();
        soundManager.url = "/soundmanager2/swf/";
        soundManager.flashVersion = 9;
        soundManager.beginDelayedInit();
        soundManager.onready(function() {
            playSound(anchor);
            isLoaded = true;
        });
    };

    $("#ddgc_detail").prependTo("#sound_cloud");

    // Clicking on the items in the carousel should stop the sound.
    $(".ddgc_item").click(function(e) {
        console.log(e.target);
        if(window.soundManager) {
            soundManager.stopAll();
        }
    });

    ddg_spice_sound_cloud.player = function(element) {
        var li = $(element);
        var anchor = li.children();
        var current_id = anchor.attr("id");
        var sound;

        // Check if it is already playing.
        // If it is, pause it.
        if(li.hasClass("sm2_playing") && isLoaded) {
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
        // If it's neither paused nor playing, we should load the audio and play it.
        } else {
            // Load SoundManager2 if it hasn't already.
            if(!isLoaded && !isLoading) {
                isLoading = true;
                $.getScript("/soundmanager2/script/soundmanager2.js", function() {
                    soundSetup(anchor);
                });
            // If SoundManager already loaded, we should just play the sound.
            } else if(isLoaded) {
                playSound(anchor);
            }
            
            li.removeClass("sm2_stopped");
            li.addClass("sm2_playing");
        }
    };
};

// Get the user's avatar if the artwork does not exist.
Handlebars.registerHelper("chooseImage", function(artwork, avatar) {
    "use strict";

    return artwork || avatar;
});

// Get the HTTPS version of the audio file.
Handlebars.registerHelper("toHttps", function(audio) {
    "use strict";

    if(audio) {
        return audio.replace(/^http:/, "https:");
    }
});