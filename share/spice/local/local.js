var ddg_spice_local_map;
var ddg_spice_local_markers = [];
var ddg_spice_local_current = 0;
var ddg_spice_local_details = {};

function ddg_spice_local(api_response) {
    console.log(api_response);
    if (!api_response || api_response.length == 0) return;

    $.getScript("/js/leaflet/leaflet.js", function() {
        Spice.render({
            //header1                  : query + ' (Local)',
            source_url               : 'http://yelp.com/?q='
                                        + encodeURIComponent(DDG.get_query()),
            source_name              : 'places near you',
            template_frame           : 'carousel',
            template_normal          : 'local',
            template_options         : { li_width : 400, li_height : 100  },
            carousel_css_id          : 'local',
            carousel_template_detail : 'local_detail',
            carousel_items           : api_response,
            force_no_fold            : true,
            data                     : api_response,
        });
        L.MapResizeControl = L.Control.extend({
            options: { position: 'bottomright' },
            onAdd: function (map) {
                var width = $('#zero_click_wrapper').outerWidth();
                var height = $('#map').outerHeight();
                var frame = $('#ddgc_frame').outerWidth();
                var offset = $('#zero_click_wrapper').css('margin-left');
                return $('<div>').append(
                            $('<a>').text('⇲').attr('href', '#')
                            .addClass('leaflet-control-zoom-in')
                            .addClass('leaflet-bar-part')
                            .addClass('leaflet-bar-full')
                            .click(function(e) {
                                return expand_map(width, height, frame, offset, e)
                            }))
                        .addClass('leaflet-control-zoom')
                        .addClass('leaflet-bar')
                        .addClass('leaflet-control')
                        .get(0);
            }
        });
        $(document).ready(function() {
            render_map(api_response);
            var deep = false;
            if (!deep) move_map_to_top();
            bind_navigation();
            $(window).resize(bind_navigation());
            ddg_spice_local_markers[0].openPopup();
        });
    });
};

function move_map_to_top() {
    $('#ddgc_detail').prependTo('#local').css('display', 'block');
    ddg_spice_local_map.invalidateSize();
    $('#ddgc_nav').hide();
    $('#ddgc_dots a').click(function() { $('#ddgc_nav').show(); });
}

function render_map(api_response) {
    $('#ddgc_detail').append($('<div>').attr('id', 'map'));

    L.Icon.Default.imagePath = "/js/leaflet/images";
    ddg_spice_local_map = L.map('map');

    var attribution = 'Map data &copy; '
        + '<a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
        + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,'
        + 'Imagery &copy <a href="http://cloudmade.com">CloudMade</a>';

    L.tileLayer(
        'http://{s}.tile.cloudmade.com/2f62ad0b4ba046f2b907b67e2c866fa4'
            + '/997/256/{z}/{x}/{y}.png',
        { 'attribution' : attribution, 'maxZoom' : 18 }
    ).addTo(ddg_spice_local_map);

    var pagination_height = $('#ddgc_pagination').outerHeight();
    for (var i in api_response) {
        if (!api_response[i].coordinates) continue;
        var location = [ api_response[i].coordinates.latitude,
                         api_response[i].coordinates.longitude ];
        ddg_spice_local_markers.push(
            L.marker(location, { 'title' : api_response[i].name, 'id' : i })
                .on('click', function(e) {
                    $('#ddgc_nav').slideDown({
                        duration : 1000,
                        step : function(number) {
                            if (number > 0) {
                                $('.leaflet-bottom').css(
                                    'margin-bottom', pagination_height + number);
                            }
                        }
                    });
                    move_to_page(e.target.options.id);
                    ddg_spice_local_map.invalidateSize();
                }).addTo(ddg_spice_local_map)
        );

        //ddg_spice_local_markers[i].bindPopup(api_response[i].name);
        ddg_spice_local_markers[i]
            .bindPopup(api_response[i].name);

        if (i == 0) {
            ddg_spice_local_map.setView(location, 13);
            ddg_spice_local_map.addControl(new L.MapResizeControl());
            $(ddg_spice_local_markers[i]._icon).css('z-index', 999);
            ddg_spice_local_map.invalidateSize();
            //ddg_spice_local_markers[i].openPopup();
        }
    }
};

function bind_navigation() {
    $('#local .ddgc_item').off().click(function(e) {
        $('#ddgc_detail').show();
        //$('.leaflet-popup-pane').fadeOut();
        ddg_spice_local_map.invalidateSize();
        move_to_page($(e.target).closest('li').attr('id'));
    }).addClass('nohover');

    var dots = $('#ddgc_dots a').off();
    dots.each(function(i, el) { $(el).attr('id', i) });
    dots.click(function(e) { move_to_page(e.target.id); });

    $('#nexta, #preva').off().click(function(e) {
        if (e.target.id.indexOf('next') != -1
            && ddg_spice_local_current != dots.length - 1)
            move_to_page(++ddg_spice_local_current);
        else if (e.target.id.indexOf('prev') != -1
                 && ddg_spice_local_current != 0)
            move_to_page(--ddg_spice_local_current);
    });
}

function move_to_page(page) {
    // TODO: if (not big)
    ddg_spice_local_markers[page].openPopup();
    var id_parts = $('#ddgc_slides li ')[page].id.match(/([^\-]*)-(.*)/);
    get_details(id_parts[1], id_parts[2], page);
    ddg_spice_local_current = page;
    for (var i in ddg_spice_local_markers) {
        $(ddg_spice_local_markers[page]._icon).css('z-index',
            ddg_spice_local_markers[page].options.zIndex);
        if (i == page) {
            ddg_spice_local_markers[i]
                ._icon.src = '/js/leaflet/images/marker-icon-green.png';
        } else {
            ddg_spice_local_markers[i]
                ._icon.src = '/js/leaflet/images/marker-icon.png';
        }
    }
    ddg_spice_local_map.setView(
        ddg_spice_local_markers[page].getLatLng(), 13,
            { 'pan' : { 'animate' : true, 'duration' : 1 } });
    $(ddg_spice_local_markers[page]._icon).css('z-index', 1000);
    $('#ddgc_slides').css('margin-left',
        -1 * $('#ddgc_frame').outerWidth() * page);
    $('#ddgc_dots a').attr('class', '');
    $('#ddgc_dots #' + page).attr('class', 'ddgc_selected');
}

function get_details(engine, id, page) {
    if (engine != 'Foursquare') return;
    if (!ddg_spice_local_details[engine + '-' + id])
        $.getJSON('/local.js?eng=' + engine + '&id=' + id, function(json) {
            ddg_spice_local_details[engine + '-' + id] = json[0];
            render_details(json[0], $('#' + engine + '-' + id));
        });
}

function render_details(json, el) {
    if (json.reviews[0])
        el.children('.reviews').text(json.reviews[0]);
    if (json.image)
        el.children('.right').append($('<img>').attr('src', json.image));
    if (json.menu)
        el.children('.details').append($('<a>').attr('href', json.menu).text('Menu'));
    if (json.hours)
        el.children('.details').append(
                '<br>Hours: ' + $.map(json.hours, function(el, i) {
                    return i + ': ' + el.join(', ')
                }).join(' ')
        );
}

function expand_map(width, height, frame, offset, e) {
    var label      = '⇲';
    var shadow     = '';
    var background = '';
    var nav_offset = 0;
    if ($(e.target).text() == label) {
        label      = '⇱';
        shadow     = '-1px -1px #bbb';
        background = 'rgba(255, 255, 255, 0.7)';
        nav_offset = -150;
        width      = 900;
        frame      = 725;
        height     = height + 300;
        offset     = '-77px';
    }
    var options = {
        '#zero_click_wrapper' : {
            'max-width'   : width + 'px',
            'width'       : width + 'px',
            'margin-left' : offset,
        },
        '#ddgc_slides li.ddgc_item' : {
            'width'  : frame - 10 + 'px',
            'height' : height + 'px',
        },
        '#map' : {
            'height' : height + 'px',
        },
        '#ddgc_frame' : {
            'width' : frame + 'px',
        },
        '#ddgc_nav' : {
            'margin-top' : nav_offset + 'px',
        },
    };
    $('#ddgc_nav').css('box-shadow', shadow);
    $('#ddgc_slider').css('background-color',  background);
    $('.leaflet-control-attribution').css({
        'box-shadow' : 'none',
        'background-color' : 'none'
    });
    $(e.target).fadeOut({
        duration : 500,
        complete : function() {
            $(e.target).text(label).fadeIn(500);
        }
    });
    $.map(options, function(attrs, el) {
        $(el).animate(attrs, {
            duration : 1000,
            step     : function() {
                ddg_spice_local_map.invalidateSize();
                $('#ddgc_slides').css(
                    'margin-left',
                    -1 * $('#ddgc_frame').outerWidth() * ddg_spice_local_current
                );
            },
        });
    });
}
