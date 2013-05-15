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

    var pagePlayer;

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

    // Initialize SoundManager2.
    window.SM2_DEFER = true;
    var soundSetup = function() {
        window.soundManager = new SoundManager();
        soundManager.url = "/soundmanager2/swf/";
        soundManager.flashVersion = 9;
        soundManager.useFlashBlock = false;
        soundManager.useHTML5Audio = false;
        soundManager.beginDelayedInit();
        soundManager.onready(function() {
            pagePlayer = new PagePlayer();
            pagePlayer.init();
            window.pagePlayer = pagePlayer;
        });
    };

    var ready = [false, false];
    var checkReady = function(toggle) {
        ready[toggle] = true;
        if(ready[0] && ready[1]) {
            soundSetup();
        }
    };

    // Load page-player.js. This JS file converts a list of MP3s into a playlist.
    $.getScript("/soundmanager2/script/page-player-soundcloud.js", function() {
        checkReady(0);
    });

    // Load SoundManager2. This JS file handles our audio.
    $.getScript("/soundmanager2/script/soundmanager2.js", function() {
        checkReady(1);
    });

    $("#ddgc_detail").prependTo("#sound_cloud");

    var last = "";
    var wasInitialized = false;
    $(".ddgc_item").click(function() {
        var sound = $(".playlist a").get(0);
        if(last !== "") {
            pagePlayer.getSoundByObject(last).destruct();
            soundManager.reset();
            last = sound;
        } else {
            last = sound;
        }
    });
};

Handlebars.registerHelper("chooseImage", function(artwork, avatar) {
    "use strict";

    var image = artwork || avatar;
    return image.replace(/large\.jpg/, "t200x200.jpg");
});

Handlebars.registerHelper("toHttps", function(audio) {
    "use strict";
    if(audio) {
        return audio.replace(/^http:/, "https:");
    }
});