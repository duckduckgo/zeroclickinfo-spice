function ddg_spice_youtube (api_result) {
    "use strict";

    window.iqytid = "";
    window.iqyt = 2;

    $.getScript("/js/r/nryt117.js", function() {
        ddgyt.nryt(api_result);
    });
    
};
