var ddg_spice_sound_cloud = function(api_result) {
    if(api_result.length === 0) {
        return;
    }

    var image_proxy = "/iu/?u=";
    Spice.render({
        data             : api_result,
        header1          : "Sound Cloud",
        source_url       : "https://soundcloud.com/",
        source_name      : "SoundCloud",
        image_url        : image_proxy + api_result[0].artwork_url,
        template_normal  : "sound_cloud",
        force_big_header : true
    });

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

    $.getScript("/soundmanager2/script/page-player.js", function() {
        checkReady(0);
    });

    $.getScript("/soundmanager2/script/soundmanager2-nodebug-jsmin.js", function() {
        checkReady(1);
    });
};