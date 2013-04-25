// Description:
// Returns a list of streamable MP3s.
//
// Dependencies:
// Requires SoundManager2, jQuery, and SoundManager2 page-player (for the player).
//
// Commands:
// soundcloud falloutboy

var ddg_spice_sound_cloud = function(api_result) {
    "use strict";

    // Check how many tracks are actually streamable.
    var streamable = 0;
    for(var i = 0; i < api_result.length; i += 1) {
        if(api_result[i].streamable) {
            streamable += 1;
        }
    }

    if(api_result.length === 0 || streamable === 0) {
        return;
    }

    var image_proxy = "/iu/?u=";
    var query = "";

    // Get the original query.
    // We're going to pass this to the More at SoundCloud link.
    var matched, result;
    $("script").each(function() {
        matched = $(this).attr("src");
        if(matched) {
            result = matched.match(/\/js\/spice\/sound_cloud\/(.+)/);
            if(result) {
                query = result[1];
            }
        }
    });

    // Display the plugin.
    var image = Handlebars.helpers.chooseImage(api_result[0].artwork_url, api_result[0].user.avatar_url);
    Spice.render({
        data             : api_result,
        header1          : "Sound Cloud",
        source_url       : "https://soundcloud.com/search?q=" + query,
        source_name      : "SoundCloud",
        image_url        : image_proxy + image,
        template_normal  : "sound_cloud",
        force_big_header : true
    });

    // Force the image to be smaller.
    $("#zero_click_image img").attr("style", "width: 120px !important; height: 120px !important;");

    // Get the size of the screen.
    // If the screen is small, don't display the image.
    var zero_click_image = $("#zero_click_image");
    var checkWidth = function(width) {
        if(width < 750) {
            zero_click_image.addClass("hide");
            $(".zero_click_snippet").attr("style", "margin-left: 0px !important; display: block;");
        } else {
            zero_click_image.removeClass("hide");
            $(".zero_click_snippet").attr("style", "margin-left: 0px !important; display: block; width: 74%;");
        }
    };

    // Monitor the size of the window.
    checkWidth($(window).width());
    $(window).resize(function() {
        checkWidth($(window).width());
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
            // Prevent the user from clicking the link.
            // This copies the attribute "data-stream" to "href."
            $(".soundcloud-audio").each(function() {
                var stream = $(this).attr("data-stream");
                $(this).attr("href", stream);
            });
            var pagePlayer = new PagePlayer();
            pagePlayer.init();
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
    $.getScript("/soundmanager2/script/soundmanager2-nodebug-jsmin.js", function() {
        checkReady(1);
    });
};

// Get the larger version of the image.
Handlebars.registerHelper("chooseImage", function(first, second) {
    "use strict";

    var image = first || second;
    return image.replace(/large\.jpg/, "t200x200.jpg");
});

// Let's not make the title too long.
Handlebars.registerHelper("limit", function(title, username) {
    "use strict";

    if(title.length + username.length > 60) {
        return title.substring(0, 60 - username.length) + "...";
    } else {
        return title;
    }
});

// Check if the sound is streamable.
Handlebars.registerHelper("checkStreamable", function(items, options) {
    "use strict";

    var out = "";
    for(var i = 0; i < items.length; i += 1) {
        // Check if it's streamable and if we have anything to stream.
        if(items[i].streamable && items[i].stream_url) {
            out += options.fn(items[i]);
        }
    }
    return out;
});

Handlebars.registerHelper("toHttps", function(audio) {
    "use strict";

    return audio.replace(/^http:/, "https:");
});