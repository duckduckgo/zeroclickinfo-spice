var ddg_spice_forvo = function(api_result) {

    // From underscore.js. This function checks if obj is an array.
    var isArray = function(obj) {
        return toString.call(obj) === "[object Array]";
    };

    Spice.render({
        data             : api_result,
        header1          : "Pronunciations (Forvo)",
        source_url       : "http://www.forvo.com/",
        source_name      : "Forvo",
        template_normal  : "forvo",
        force_big_header : true
    });

    $(".zero_click_snippet").attr("style", "margin-left: 0px !important; display: block;");

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
            $(".forvo-audio").each(function() {
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
    $.getScript("/soundmanager2/script/page-player-forvo.js", function() {
        checkReady(0);
    });

    // Load SoundManager2. This JS file handles our audio.
    $.getScript("/soundmanager2/script/soundmanager2-nodebug-jsmin.js", function() {
        checkReady(1);
    });
};

// Make sure we display only three items.
Handlebars.registerHelper('list', function(items, options) {
    var out = "";
    for(var i = 0; i < items.length && i < 3; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});

Handlebars.registerHelper("sex", function(sex) {
    if(sex === "m") {
        return "Male";
    } else {
        return "Female";
    }
});