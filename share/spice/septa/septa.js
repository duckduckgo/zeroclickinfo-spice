function ddg_spice_septa(api_result) {
    console.log(api_result);

    Spice.render({
        data              : api_result,
        source_name       : 'www.septa.org',
        source_url        : 'www.septa.org',
        template_normal   : 'septa'
    });
};

Handlebars.registerHelper ('delay', function(delay) {
    if (delay == "On time") return "";
    var parts = delay.split(" ");
    var delay = parts[0] + " minute" + (parts[0] > 1 ? "s" : "") + " late";
    return " (" + delay + ")";
});
