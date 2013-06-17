function ddg_spice_youtube (api_result) {
    "use strict";

    $.getScript("/js/r/nryt116.js", function() {
        window.iqyt = 2;
        ddgyt.nryt(api_result);
    });
};