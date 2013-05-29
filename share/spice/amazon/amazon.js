function ddg_spice_amazon(api_response) {
    console.log(api_response);
    api_response = api_response.opt.Items;

    var items = api_response.Item;
    
    if (!items || !(items.length > 1)) return;

    var query = DDG.get_query().replace(/\s+amazon\s*$|^\s*amazon\s+/i, '');

    var spotlight_resize = function() {
        $('#amazon .spotlight').css(
            {'max-height' : ($('#ddgc_detail').height() > 150 ?
                                $('#ddgc_detail').height() : 150) + 'px'}
        );
        $('#amazon .description').width(
            //width - parent padding - spotlight image width - left-margin
            $('#ddgc_detail').width() - (7*2) - 150 - 20
        );
    };

    Spice.render({
        header1                  : query + ' (Amazon)',
        source_url               : api_response['@MoreSearchResultsUrl'].$t,
        source_name              : 'Amazon',
        force_big_header         : true,
        force_favicon_domain     : 'www.amazon.com',
        template_frame           : 'carousel',
        template_normal          : 'amazon',
        carousel_css_id          : 'amazon',
        carousel_template_detail : 'amazon_detail',
        carousel_items           : items,
        force_no_fold            : true,
        item_callback            : spotlight_resize
    });

    $(window).resize(spotlight_resize);


    items.map(function(el, i) {
        items['amazon-' + el['@ASIN']] =
            el.CustomerReviews['@IFrameURL']
                .replace('http://www.amazon.com/reviews/iframe?', '');
    });

    $(document).ready(function() {
        $('.ddgc_item').on("click", function() {
            nrj('https://dylan.duckduckgo.com/m.js?r='
                + escape(items[this.id])
                + '&callback=ddg_spice_amazon_detail');
        });
    });
}


function ddg_spice_amazon_detail(api_response) {
    console.log(api_response);
    if (api_response.item.stars.$t == 'unrated') {
        $('<span>unrated</span>').insertAfter('#ddgc_detail .stars');
        $('#ddgc_detail .stars').hide();
    } else {
        $('#ddgc_detail .stars')
            .attr('src', '/iu/?u=' + api_response.item.stars.$t);
    }
    $('#ddgc_detail .review-count')
        .text(api_response.item.reviews.$t);
}
