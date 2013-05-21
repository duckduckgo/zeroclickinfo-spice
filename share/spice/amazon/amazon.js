function ddg_spice_amazon(api_response) {
    api_response = api_response.ItemSearchResponse.Items;
    console.log(api_response);

    var items = api_response.Item;
    
	var query = DDG.get_query().replace(/\s+amazon\s*$|^\s*amazon\s+/i, '');

    Spice.render({
        header1                  : query + " (Amazon)",
        source_url               : api_response.MoreSearchResultsUrl.$t,
        source_name              : 'Amazon',
        force_big_header         : true,
        template_frame           : "carousel",
        template_normal          : "amazon",
        carousel_css_id          : "amazon",
        carousel_template_detail : "amazon_detail",
        carousel_items           : items,
        force_no_fold            : true,
    });
}
