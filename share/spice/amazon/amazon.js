var ddg_spice_amazon_carousel_add_items;
var ddg_spice_amazon_single_item;
var ddg_spice_amazon_query;

function ddg_spice_amazon(api_response) {
    if (!api_response || !api_response.results ||
	!api_response.results.length || api_response.results.length == 0) return;

    ddg_spice_amazon_query =
        DDG.get_query().replace(/\s+amazon\s*$|^\s*amazon\s+/i, '');

    // Get review stars
    if (api_response.results.length == 1) {
        ddg_spice_amazon_single_item = api_response.results[0];
        nrj('/m.js?r='+ escape(ddg_spice_amazon_single_item.rating
                        .replace('http://www.amazon.com/reviews/iframe?', ''))
            + '&cb=ddg_spice_amazon_render_single');
        return;
    }

    var spotlight_resize = function(index, item, obj, is_cached) {
        if ($('#ddgcarousel').outerWidth() <= 400) {
            $('#amazon .spotlight').hide();
            $('#amazon .description').css({
                'width' : '100%',
                'margin-left' : '0',
            });
        } else {
            $('#amazon .spotlight').show().css({
                'max-height'  : ($('#ddgc_detail').height() > 150 ?
                                    $('#ddgc_detail').height() : 150) + 'px',
            });
            $('#amazon .description').css({
                // width - parent margins (both sides)
                // - parent padding - spotlight image width - left-margin
                'width' : $('#ddgc_nav').width() - 10 - (12*2) - 150 - 20,
                'margin-left' : '20px'
            });
        }
        if (item && !is_cached)
            nrj('/m.js?r='
                + escape(item.rating.replace('http://www.amazon.com/reviews/iframe?', ''))
                + '&cb=ddg_spice_amazon_detail');
    };

    ddg_spice_amazon_carousel_add_items =
        Spice.render({
            header1                  : ddg_spice_amazon_query + ' (Amazon)',
            source_url               : api_response.more_at,
            source_name              : 'Amazon',
            force_big_header         : true,
            force_favicon_domain     : 'www.amazon.com',
            template_normal          : 'amazon',
            template_frame           : 'carousel',
            template_options         : {
                template_detail          : 'amazon_detail',
                use_alternate_template   : false, // single item case will be handled by the backend not by carousel
                items                    : api_response.results,
                li_height                : 130
            },
            force_no_fold            : true,
            item_callback            : spotlight_resize,
        });

    nrj('/m.js?pg=2'
	+ '&cb=ddg_spice_amazon_wait_for_render'
	+ '&q=' + escape(DDG.get_query()));

    $(window).resize(spotlight_resize);
}

function ddg_spice_amazon_wait_for_render(api_response) {
    window.setTimeout(function() {
            ddg_spice_amazon_carousel_add_items(api_response.results)
    }, 500);
}

function ddg_spice_amazon_detail(api_response) {
    if (api_response.stars == 'unrated') {
        $('<span>unrated</span>')
            .insertAfter('#ddgc_detail .stars');
        $('#ddgc_detail .stars').hide();
    } else {
        $('#ddgc_detail .stars')
            .attr('src', '/iu/?u=' + api_response.stars);
    }
    $('#ddgc_detail .review-count')
        .text(api_response.reviews);
}

function ddg_spice_amazon_deep_image(api_response) {
    var link_container = $('#links').css({ 'float' : 'left' });
    var links = $('#links div[id|="r1"]');

    var image_column = $('<div id="image-column"></div>')
                        .css({ 'float' : 'left', 'width' : '100px' })
                        .insertAfter(link_container);

    links.each(function(i, el) {
        image_column.append(
            $('<div id="deep-image-' + i + '"></div>')
            .css({ 'height' : $(el).outerHeight(true),
                   'border' : '1px solid black' })
        );
    });

}

function ddg_spice_amazon_render_single(api_response) {
    ddg_spice_amazon_single_item.stars = api_response.stars;
    ddg_spice_amazon_single_item.reviews = api_response.reviews;
    Spice.render({
	source_url               : api_response.more_at,
        source_name              : 'Amazon',
        data                     : ddg_spice_amazon_single_item,
        image_url                : ddg_spice_amazon_single_item.img,
        force_favicon_domain     : 'www.amazon.com',
        template_normal          : 'amazon_single',
        force_no_fold            : true,
    });
}
