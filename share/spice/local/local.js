var ddg_spice_local_details = {};

function ddg_spice_local(api_response) {
    console.log(api_response);
    if (!api_response || api_response.length == 0) return;

    Spice.render({
        //header1                  : query + ' (Local)',
        source_url               : 'http://yelp.com/?q='
                                    + encodeURIComponent(DDG.get_query()),
        source_name              : 'places near you',
        template_frame           : 'map',
        template_normal          : 'local',
        template_options         : { li_width : 300, li_height : 110 },
        map_css_id               : 'local',
        map_template_detail      : 'local_detail',
        map_items                : api_response,
        force_no_fold            : true,
        data                     : api_response,
        item_callback            : get_details
    });
};

function get_details(engine, id, page) {
    if (engine != 'Foursquare') return;
    if (!ddg_spice_local_details[engine + '-' + id])
        $.getJSON('/local.js?eng=' + engine + '&id=' + id, function(json) {
            ddg_spice_local_details[engine + '-' + id] = json[0];
            render_details(json[0], $('#' + engine + '-' + id + ' div.border'));
        });
}

function render_details(json, el) {
    if (json.image)
        el.children('.right').append($('<img>').attr('src', json.image));
    if (json.menu)
        el.children('.left').append($('<a>').attr('href', json.menu).text('Menu'));
    if (json.hours && json.hours['Today']) {
        el.children('.left').append(
                '<br>Open today: ' + json.hours['Today'].join(', ')
        );
    }
}

Handlebars.registerHelper('format_address', function(address) {
    return address.split(',')[0];
});
