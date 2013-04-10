var ddg_spice_sound_cloud = function(api_result) {
    Spice.render({
        data             : api_result,
        header1          : "Sound Cloud",
        source_url       : "https://soundcloud.com/",
        source_name      : "SoundCloud",
        template_normal  : "sound_cloud",
        image_url        : "http://developers.soundcloud.com/assets/powered_by_black-ee7e351d64511ecea75c6c17ca30064f.png",
        force_big_header : true
    });

    var soundSetup = function() {
        window.soundManager = new SoundManager();
        soundManager.url = "/soundmanager2/swf/";
        soundManager.flashVersion = 9;
        soundManager.useFlashBlock = false;
        soundManager.useHTML5Audio = false;
        soundManager.beginDelayedInit();
        soundManager.onready(function() {
            var pagePlayer = new PagePlayer();
            pagePlayer.init(typeof PP_CONFIG !== 'undefined' ? PP_CONFIG : null);
        });
    };

    var loadPagePlayer = function() {
        $.getScript("/soundmanager2/script/page-player.js", soundSetup);
    };

    window.SM2_DEFER = true;
    $.getScript("/soundmanager2/script/soundmanager2-nodebug-jsmin.js", loadPagePlayer);
};