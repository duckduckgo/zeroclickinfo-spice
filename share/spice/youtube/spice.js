function ddg_spice_youtube(api_result) {
    "use strict";
    $.getScript("/js/nryt.js", function() {
        window.iqyt = 2;
        ddgyt.nryt(api_result);
    });
}