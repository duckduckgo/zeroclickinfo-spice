var ddg_spice_amazon_carousel_add_items;
var ddg_spice_amazon_query;

function ddg_spice_amazon(api_response) {
    if (!api_response || !api_response.results ||
    !api_response.results.length || api_response.results.length == 0) return;

    ddg_spice_amazon_query =
        DDG.get_query().replace(/\s+amazon\s*$|^\s*amazon\s+/i, '');

    // Pass single item response into data object
    if (api_response.results.length == 1) {
        var data = api_response.results[0];
    }

    var spotlight_resize = function(index, item, obj, is_cached) {
        if ($('#ddgcarousel').outerWidth() <= 400) {
            $('#spice_amazon .spotlight').hide();
            $('#spice_amazon .description').css({
                'width' : '100%',
                'margin-left' : '0',
            });
        } else {
            $('#spice_amazon .spotlight').show().css({
                'max-height'  : ($('#ddgc_detail').height() > 150 ?
                                    $('#ddgc_detail').height() : 150) + 'px',
            });
            $('#spice_amazon .description').css({
                // width - parent margins (both sides)
                // - parent padding - spotlight image width - left-margin
                'width' : $('#ddgc_nav').width() - 10 - (12*2) - 150 - 20,
                'margin-left' : '20px'
            });
        }
        if (item && !is_cached)
            nrj('/m.js?r='
                + escape(item.rating.replace('http://www.amazon.com/reviews/iframe?', ''))
                + '&cb=ddg_spice_amazon_reviews');
    };

    ddg_spice_amazon_carousel_add_items =
        Spice.render({
            data                     : data || api_response,
            header1                  : ddg_spice_amazon_query + ' (Amazon)',
            source_url               : api_response.more_at,
            source_name              : 'Amazon',
            force_big_header         : true,
            force_favicon_domain     : 'www.amazon.com',
            template_frame           : 'carousel',
            spice_name               : 'amazon',
            template_normal          : 'amazon_single',
            force_no_fold            : true,
            item_callback            : spotlight_resize,
            template_options         : {
                template_detail          : 'amazon_detail',
                template_item            : 'amazon',
                items                    : api_response.results,
                li_height                : 130,
                single_item_handler      : function(obj){

                    // set image_url to populate img_zero_click
                    obj.image_url = obj.data.img;
                    // remove header
                    obj.header1   = '';
                    obj.force_big_header = false;

                    // Get "star rating" for item and pass it
                    // to ddg_spice_amazon_reviews
                    $.getJSON(
                        '/m.js?r='+ escape(obj.data.rating.replace('http://www.amazon.com/reviews/iframe?', '')),
                        function( response ){ ddg_spice_amazon_reviews(response) }
                    );
                }
            }
        });

    nrj('/m.js?pg=2'
    + '&cb=ddg_spice_amazon_wait_for_render'
    + '&q=' + escape(DDG.get_query()));

    $(window).resize(spotlight_resize);
}

function ddg_spice_amazon_wait_for_render(api_response) {
    if (ddg_spice_amazon_carousel_add_items) {
        window.setTimeout(function() {
            ddg_spice_amazon_carousel_add_items(api_response.items);
        }, 500);
    }
}

function ddg_spice_amazon_reviews(api_response) {

    if (api_response.stars == 'unrated') {
        $('<span>unrated</span>')
            .insertAfter('#spice_amazon .stars');
        $('#spice_amazon .stars').hide();
    } else {
        $('#spice_amazon .stars')
            .attr('src', '/iu/?u=' + api_response.stars);
    }
    $('#spice_amazon .review-count')
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
