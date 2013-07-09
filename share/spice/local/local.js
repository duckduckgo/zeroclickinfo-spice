var ddg_spice_local_endpoint = 'http://dylan.duckduckgo.com';

function ddg_spice_local(api_response) {
    console.log(api_response);
    if (!api_response || api_response.length == 0) return;

    Spice.render({
        header1                  : ' (Local)',
        source_url               : 'http://yelp.com/?q='
                                    + encodeURIComponent(DDG.get_query()),
        source_name              : 'places near you',
        template_frame           : 'carousel',
        template_normal          : 'local',
        carousel_css_id          : 'local',
        carousel_template_detail : 'local_detail',
        carousel_items           : api_response.businesses,
        data                     : api_response.businesses
    });

}
