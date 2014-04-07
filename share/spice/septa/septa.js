function ddg_spice_septa(api_result) {
    "use strict";

    if (api_result.length < 1 ||
            !api_result[0].orig_line ||
            !api_result[0].orig_departure_time ||
            !api_result[0].orig_delay) {
        return;
    }

    var script  = $("[src*='js/spice/septa/']")[0];
    var source  = unescape($(script).attr("src"));
    var parts   = source.split('/');
    var from    = parts[4];
    var to      = parts[5];

    Spice.add({
        data              : api_result,
        sourceName       : 'SEPTA',
        sourceUrl        : 'http://www.septa.org/schedules/',
        templates: {
            item: Spice.septa.septa,
            detail: Spice.septa.septa
        },
        header1           : 'Trains from ' + from + ' to ' + to,
        force_favicon_url : 'http://www.septa.org/site/images/favicon.ico'
    });
};

Handlebars.registerHelper ('delay', function(delay) {
    "use strict";

    if (delay == "On time") {
        return "";
    }
    if (delay == "Suspended") {
        return " (Suspended) ";
    }
    var parts = delay.split(" ");
    var delay = parts[0] + " minute" + (parts[0] > 1 ? "s" : "") + " late";
    return " (" + delay + ")";
});
