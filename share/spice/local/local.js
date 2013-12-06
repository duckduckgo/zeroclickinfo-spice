function get_details(item, cached) {
    if (item.engine != 'Foursquare') return;
    if (!cached)
        $.getJSON('/local.js?eng=' + item.engine + '&id=' + item.id, function(json) {
            render_details(json[0], $('#' + item.engine + '-' + item.id + ' div.border'));
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

function ddg_spice_local(api_response) {
    if (!api_response || api_response.length == 0) return;

    Spice.render({
        source_url               : 'http://yelp.com/?q='
                                    + encodeURIComponent(DDG.get_query()),
        source_name              : 'places near you',
        template_frame           : 'map',
        template_normal          : 'local',
        map_css_id               : 'local',
        map_template_detail      : 'local_detail',
        map_items                : api_response,
        force_no_fold            : true,
        data                     : api_response,
        item_callback            : get_details
    });
};

Handlebars.registerHelper('format_address', function(address) {
    if (address) return address.split(',')[0];
});
