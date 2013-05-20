var ddg_spice_forvo = function(api_result) {
    "use strict";

    // api_result.items can be either an array or an object.
    // Forvo returns either an array-like object or an actual array.
    // {0: "...", 1: "...", 2: "..."} or ["...", "...", "..."].
    if($.isArray(api_result.items)) {
        api_result.isArray = true;
    } else {
        api_result.isArray = false;
    }

    // Display the Spice plug-in.
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

        });
    };

    ddg_spice_forvo.player = function(element) {
        console.log(element);
    }

    // Load SoundManager2. This JS file handles our audio.
    $.getScript("/soundmanager2/script/soundmanager2-nodebug-jsmin.js", soundSetup);
};

// Make sure we display only five items.
Handlebars.registerHelper("list", function(items, options) {
    "use strict";

    var out = "";
    for(var i = 0; i < items.length && i < 5; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});

// The sex (returned as either "m" or "f") should be expanded.
Handlebars.registerHelper("sex", function(sex) {
    "use strict";

    if(sex === "m") {
        return ", Male";
    } else {
        return ", Female";
    }
});

// Make sure we display only five items.
// This helper is for objects.
Handlebars.registerHelper("listObjects", function(items, options) {
    "use strict";

    var hasOwn = Object.prototype.hasOwnProperty,
        index = 0,
        out = "";

    for(var data in items) {
        if(hasOwn.call(items, data)) {
            if(index < 5) {
                out += options.fn(items[data]);
            }
            index += 1;
        }
    }

    return out;
});