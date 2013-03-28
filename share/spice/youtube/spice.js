function ddg_spice_youtube(api_result) {
    "use strict";
    DDG.load("/js/nryt.js", {
        success: function() {
            window.iqyt = 2;
            ddgyt.nryt(api_result);
        }
    });
}