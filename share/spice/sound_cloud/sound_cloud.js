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

    // Get the original query.
    // We're going to pass this to the header.
    var getCaller = function() {
        return spice_call_path.split("/").splice(4);
    };

    var query = getCaller()[0];

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
        header1                  : decodeURIComponent(query) + " (SoundCloud)",
        source_url               : "https://soundcloud.com/search?q=" + query,
        source_name              : "SoundCloud",
        template_normal          : "sound_cloud",
        carousel_css_id          : "sound_cloud",
        template_frame           : "carousel",
        force_big_header         : true,
        carousel_items           : context,
        carousel_template_detail : "sound_cloud_details",
        force_no_fold            : true
    });

    // This gets called when the sound is finished playing.
    // It basically just resets the look of the player.
    var clearPlayer = function() {
        var li = $("ul.playlist li");
        li.removeClass();
        li.addClass("sm2_stopped");
        soundManager.stopAll();
    };

    var addPadding = function(time) {
        return time < 10 ? "0" + time : time;
    };

    // Coverts the milliseconds given to minutes and seconds.
    // e.g., 70000 milliseconds gets converted to 01:00.
    var formatTime = function(milliseconds) {
        var minutes = Math.floor(milliseconds / 1000 / 60);
        var seconds = Math.floor(60 * ((milliseconds / 1000 / 60) - minutes));
        
        return addPadding(minutes) + ":" + addPadding(seconds);
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
                // When the sound is finished playing, reset it.
                onfinish: function() {
                    clearPlayer();
                },
                // Update the time displayed.
                whileplaying: function() {
                    $("#position").html(formatTime(this.position));
                    $("#total").html(formatTime(this.durationEstimate));

                    // We add this just in case onfinish doesn't fire.
                    if(this.position === this.durationEstimate) {
                        clearPlayer();
                    }
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
        soundManager.useFastPolling = true;
        soundManager.useHighPerformance = true;
        soundManager.ontimeout(function() {
            isFailed = true;
            isLoaded = true;
            clearPlayer();
        });
        soundManager.beginDelayedInit();
        soundManager.onready(function() {
            playSound(anchor);
            isLoaded = true;
        });
    };

    // This controls our player.
    var player = function(element) {

        var li = $(element);
        var anchor = li.children();

        // Get the sound
        var current_id = anchor.attr("id");
        var sound;

        // Check if it is already playing.
        // If it is, pause it.
        if(li.hasClass("sm2_playing") && isLoaded) {
            li.removeClass();
            li.addClass("sm2_paused");

            sound = soundManager.getSoundById(current_id);
            sound.pause();
        // If it's not playing, it's probably paused.
        // Let's play it.
        } else if(li.hasClass("sm2_paused")) {
            li.removeClass();
            li.addClass("sm2_playing");

            sound = soundManager.getSoundById(current_id);
            sound.resume();
        // If it's neither paused nor playing, then it means that we didn't load it yet.
        } else {
            // Load SoundManager2 if it hasn't already.
            if(!isLoaded && !isLoading) {
                isLoading = true;
                $.getScript("/soundmanager2/script/soundmanager2-nodebug-jsmin.js", function() {
                    soundSetup(anchor);
                });
            // If SoundManager already loaded, we should just play the sound.
            } else if(isLoaded) {
                playSound(anchor);
            }
            
            li.removeClass();
            li.addClass("sm2_playing");
        }
    };

    $(document).ready(function() {
        // Add the player on top of the carousel.
        $("#ddgc_detail").prependTo("#sound_cloud");

        // Clicking on the items in the carousel should stop the sound.
        $(".ddgc_item").click(function() {

            if(window.soundManager) {
                soundManager.stopAll();
            }
        });
    });

    // Expose the function that controls our player.
    ddg_spice_sound_cloud.player = player;
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