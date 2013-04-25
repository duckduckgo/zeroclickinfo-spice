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

    // Play the sound.
    var playSound = function(element) {
        // Everything else should be stopped.
        $(".soundcloud-stream").each(function() {
            $(this).removeClass("playing");
            $(this).removeClass("paused");
        });
        soundManager.stopAll();

        // Let's play the sound.
        var sound = soundManager.createSound({
            id       : $(element).attr("id"),
            url      : $(element).data("stream"),
            onfinish : function() {
                $(element).removeClass("playing");
            }
        });
        sound.play();
        $(element).addClass("playing");
    };

    // Pause the sound.
    var pauseSound = function(element) {
        var id= $(element).attr("id");
        soundManager.pause(id);
        $(element).removeClass("playing");
        $(element).addClass("paused");
    };

    // Resume the sound.
    var resumeSound = function(element) {
        var id = $(element).attr("id");
        soundManager.resume(id);
        $(element).removeClass("paused");
        $(element).addClass("playing");
    }

    // Initialize SoundManager2.
    var soundSetup = function(element) {
        window.soundManager = new SoundManager();
        soundManager.url = "/soundmanager2/swf/";
        soundManager.flashVersion = 9;
        soundManager.useFlashBlock = false;
        soundManager.useHTML5Audio = false;
        soundManager.beginDelayedInit();
        soundManager.onready(function() {
            playSound(element);
        });
    };

    $(".soundcloud-stream").click(function() {
        // Check if we already loaded SoundManager.
        if(window.soundManager) {
            // If it's playing, pause it.
            if($(this).hasClass("playing")) {
                pauseSound(this);
            // If it's paused, play it.
            } else if($(this).hasClass("paused")) {
                resumeSound(this);
            // If it's none of the above, just play it.
            } else {
                playSound(this);
            }
        } else {
            // Load SoundManager2 if it hasn't loaded.
            window.SM2_DEFER = true;
            var that = this;
            $.getScript("/soundmanager2/script/soundmanager2-nodebug-jsmin.js", function() {
                soundSetup(that);
            });
        }
    });
};

Handlebars.registerHelper("chooseImage", function(artwork, avatar) {
    "use strict";

    var image = artwork || avatar;
    return image.replace(/large\.jpg/, "t200x200.jpg");
});