function ddg_spice_septa(api_result) {
    if (api_result.length < 1 ||
            !api_result[0].orig_line ||
            !api_result[0].orig_departure_time ||
            !api_result[0].orig_delay) return;

    var script  = $("[src*='js/spice/septa/']")[0];
    var source  = unescape($(script).attr("src"));
    var parts   = source.split('/');
    var from    = parts[4];
    var to      = parts[5];

    Spice.render({
        data              : api_result,
        source_name       : 'SEPTA',
        source_url        : 'http://www.septa.org/schedules/',
        template_normal   : 'septa',
        header1           : 'Trains from ' + from + ' to ' + to,
        force_favicon_url : 'http://www.septa.org/site/images/favicon.ico'
    });
};

Handlebars.registerHelper ('delay', function(delay) {
    if (delay == "On time") return "";
    var parts = delay.split(" ");
    var delay = parts[0] + " minute" + (parts[0] > 1 ? "s" : "") + " late";
    return " (" + delay + ")";
});
