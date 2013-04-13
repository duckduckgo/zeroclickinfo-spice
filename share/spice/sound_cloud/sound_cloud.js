var ddg_spice_sound_cloud = function(api_result) {
    if(api_result.length === 0) {
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
    Spice.render({
        data             : api_result,
        header1          : "Sound Cloud",
        source_url       : "https://soundcloud.com/search?q=" + query,
        source_name      : "SoundCloud",
        image_url        : image_proxy + api_result[0].artwork_url,
        template_normal  : "sound_cloud",
        force_big_header : true
    });

    // Get the size of the screen.
    // If the screen is small, don't display the image.
    var zero_click_image = $("#zero_click_image");
    var checkWidth = function(width) {
        if(width < 750) {
            zero_click_image.addClass("hide");
        } else {
            zero_click_image.removeClass("hide");
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
            pagePlayer.init(typeof PP_CONFIG !== 'undefined' ? PP_CONFIG : null);
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
    $.getScript("/soundmanager2/script/page-player.js", function() {
        checkReady(0);
    });

    // Load SoundManager2. This JS file handles our audio.
    $.getScript("/soundmanager2/script/soundmanager2-nodebug-jsmin.js", function() {
        checkReady(1);
    });
};

Handlebars.registerHelper("chooseImage", function(first, second) {
    return first || second;
});