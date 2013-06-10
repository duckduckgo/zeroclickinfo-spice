function ddg_spice_septa(api_result) {
    console.log(api_result);
    var places = DDG.get_query().toLowerCase()
        .replace(/\s+septa|septa\s+/, '')
        .replace(/(next trains?|train times|train schedule)?( from)? /, '')
        .replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase()
                 + txt.substr(1).toLowerCase()
        })
        .split(" To ");

    Spice.render({
        data              : api_result,
        source_name       : 'SEPTA',
        source_url        : 'http://www.septa.org/schedules/',
        template_normal   : 'septa',
        header1           : 'Trains from ' + places[0]
                             + ' to ' + places[1] + ' (SEPTA)',
        force_no_icon     : true
    });
};

Handlebars.registerHelper ('delay', function(delay) {
    if (delay == "On time") return "";
    var parts = delay.split(" ");
    var delay = parts[0] + " minute" + (parts[0] > 1 ? "s" : "") + " late";
    return " (" + delay + ")";
});
