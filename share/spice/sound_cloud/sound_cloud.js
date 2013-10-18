// Description:
// Returns a list of streamable MP3s.
//
// Dependencies:
// Requires SoundManager2 and jQuery.
//
// Commands:
// soundcloud falloutboy


nrj("soundmanager2/script/soundmanager2-nodebug-jsmin.js", true);

function ddg_spice_sound_cloud (api_result) {
    "use strict";

    // Get the original query.
    // We're going to pass this to the header.
    var query = "";
    $("script").each(function() {
        var matched, result;
        matched = $(this).attr("src");
        if(matched) {
            result = matched.match(/\/js\/spice\/sound_cloud\/([^\/]+)/);
            if(result) {
                query = result[1];
            }
        }
    });

    // Items that we should not show.
    var skip_id = {
	80320921: true, 
	75349402: true
    };

    var skip_array = ["soundcloud"];

    var context = [];
    for(var i = 0; i < api_result.length; i += 1) {
	// Only add the tracks that are:
	// - Streamable.
	// - Are not in the skip hash.
	// - Is relevant.
	var inSkip = api_result[i].id in skip_id;
	var isRelevantTitle = DDG.isRelevant(api_result[i].title, skip_array);
	var isRelevantUsername = DDG.isRelevant(api_result[i].user.username, skip_array);
	var isRelevantBoth = DDG.isRelevant(api_result[i].title + " " + api_result[i].user.username, skip_array);

        if(api_result[i].streamable && !inSkip && (isRelevantTitle || isRelevantUsername || isRelevantBoth)) {
            context.push(api_result[i]);
        }
    }

    // Exit if we don't have what we need.
    if(!api_result || context.length === 0) {
        return;
    }

    // This gets called when the sound is finished playing.
    // It basically just resets the look of the player.
    var clearPlayer = function() {
        var li = $("ul.playlist li");
        li.removeClass();
        li.addClass("sm2_stopped");
        soundManager.stopAll();
    };

    // Display the plugin.
    Spice.render({
        data                     : context,
        header1                  : decodeURIComponent(query) + " (SoundCloud)",
        source_url               : "https://soundcloud.com/search?q=" + query,
        source_name              : "SoundCloud",
        spice_name               : "sound_cloud",
        template_frame           : "carousel",
        template_options         : {
            items           : context,
            template_detail : "sound_cloud_details",
            single_item_handler: function(obj) {
                obj.image_url = obj.data[0].artwork_url || obj.data[0].user.avatar_url;
            }
        },
        force_big_header         : true,
        force_no_fold            : true,
        item_callback            : function() {
            if(window.soundManager) {
                clearPlayer();
            }
        }
    });

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
                soundSetup(anchor);
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
    });

    // Expose the function that controls our player.
    ddg_spice_sound_cloud.player = player;
};

// Get the user's avatar if the artwork does not exist.
Handlebars.registerHelper("chooseImage", function(artwork, avatar) {
    "use strict";

    return artwork || avatar;
});
