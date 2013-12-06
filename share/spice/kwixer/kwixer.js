var ddg_spice_kwixer_carousel_add_items;
var ddg_spice_kwixer_single_item;
var ddg_spice_kwixer_query;
var ddg_spice_kwixer_server_query;
function ddg_spice_kwixer(api_response) {
    
    if (!api_response || api_response.lengt==0 ) return;
    
    ddg_spice_kwixer_query = DDG.get_query();
    ddg_spice_kwixer_server_query = ddg_spice_kwixer_query;
    var searchEndTriggers = ['actor','actress','movies','films','movie','film'];

    searchEndTriggers.forEach(function(str)
    {
        if(ddg_spice_kwixer_server_query.indexOf(str) == ddg_spice_kwixer_server_query.length - str.length)
            ddg_spice_kwixer_server_query = ddg_spice_kwixer_server_query.replace(str,"");
    });
    
    var spotlight_resize = function(index, item, obj, is_cached) {
        if ($('#ddgcarousel').outerWidth() <= 400) {
            $('#spice_kwixer .spotlight').hide();
            $('#spice_kwixer .description').css({
                'width' : '100%',
                'margin-left' : '0',
            });
        } else {
            $('#spice_kwixer .spotlight').show().css({
                'max-height'  : ($('#ddgc_detail').height() > 150 ?
                                    $('#ddgc_detail').height() : 150) + 'px',
            });
            $('#spice_kwixer .description').css({
                // width - parent margins (both sides)
                // - parent padding - spotlight image width - left-margin
                'width' : $('#ddgc_nav').width() - 10 - (12*2) - 150 - 20,
                'margin-left' : '20px'
            });
        }
    };

    ddg_spice_kwixer_carousel_add_items =
        Spice.render({
            header1                  : ddg_spice_kwixer_query + ' (Kwixer)',
            source_url               : "https://www.kwixer.com/#/explore?category=movie&query=" + ddg_spice_kwixer_server_query , //TODO more at URL 
            source_name              : 'Kwixer',
            force_big_header         : true,
            force_favicon_domain     : 'www.kwixer.com',
            template_frame           : 'carousel',
            spice_name               : 'kwixer',
            template_options         : {
                template_detail          : 'kwixer_detail',
                template_item            : 'kwixer',
                use_alternate_template   : false, // single item case will be handled by the backend not by carousel
                items                    : api_response,
                li_height                : 130
            },
            force_no_fold            : true,
            item_callback            : spotlight_resize,
        });

    
    nrj('/m.js?pg=2'
	+ '&cb=ddg_spice_kwixer_wait_for_render'
	+ '&q=' + escape(DDG.get_query()));

    $(window).resize(spotlight_resize);
}

function ddg_spice_kwixer_wait_for_render(api_response) {
    if (ddg_spice_kwixer_carousel_add_items) {
        window.setTimeout(function() {
            ddg_spice_kwixer_carousel_add_items(api_response.items);
        }, 500);
    }
}

function ddg_spice_kwixer_detail(api_response) {
 
}

function ddg_spice_kwixer_deep_image(api_response) {
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

function ddg_spice_kwixer_render_single(api_response) {
    ddg_spice_kwixer_single_item.stars = api_response.stars;
    ddg_spice_kwixer_single_item.reviews = api_response.reviews;
    Spice.render({
	source_url               : api_response.more_at,
        source_name              : 'Kwixer',
        data                     : ddg_spice_kwixer_single_item,
        image_url                : ddg_spice_kwixer_single_item.img,
        force_favicon_domain     : 'www.kwixer.com',
        template_normal          : 'kwixer_single',
        force_no_fold            : true,
    });
}
