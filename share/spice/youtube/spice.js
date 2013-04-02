// This function calls the internal YouTube plugin.
var ddg_spice_youtube = function(api_result) {
    "use strict";

    // Loads a JavaScript file asynchronously.
    var loadJS = function(path, callback) {
        var element = nrj(path, false);
        YAHOO.util.Event.addListener(element, "load", callback);
        return element;
    };

    // Loads the YouTube plugin.
    loadJS("/js/r/nryt114.js", function() {
        window.iqyt = 2;
        ddgyt.nryt(api_result);
    });
};

