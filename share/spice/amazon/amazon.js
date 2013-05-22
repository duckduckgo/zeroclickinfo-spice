function ddg_spice_amazon(api_response) {
    api_response = api_response.ItemSearchResponse.Items;
    console.log(api_response);

    var items = api_response.Item;
    
	var query = DDG.get_query().replace(/\s+amazon\s*$|^\s*amazon\s+/i, '');

    Spice.render({
        header1                  : query + ' (Amazon)',
        source_url               : api_response.MoreSearchResultsUrl.$t,
        source_name              : 'Amazon',
        force_big_header         : true,
        template_frame           : 'carousel',
        template_normal          : 'amazon',
        carousel_css_id          : 'amazon',
        carousel_template_detail : 'amazon_detail',
        carousel_items           : items,
        force_no_fold            : true,
    });


    items.map(function(el, i) {
        items['amazon-' + el.ASIN.$t] =
            el.CustomerReviews.IFrameURL.$t
                .replace('http://www.amazon.com/reviews/iframe?', '');
    });

    $('.ddgc_item').on("click", function() {
        nrj('https://dylan.duckduckgo.com/m.js?r='
            + escape(items[this.id])
            + '&callback=ddg_spice_amazon_detail');
    });
}


function ddg_spice_amazon_detail(api_response) {
    console.log(api_response);
    $('#ddgc_detail .stars')
        .attr('src', '/iu/?u=' + api_response.item.stars.$t);
    $('#ddgc_detail .review-count')
        .text(api_response.item.reviews.$t);
}
