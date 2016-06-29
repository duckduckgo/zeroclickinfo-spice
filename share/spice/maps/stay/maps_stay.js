(function (env) {
    "use strict";

    env.ddg_spice_maps_stay = function(api_result) {       
        var ID = 'maps_stay';

        // If place doesn't exist on the Earth -> fail, don't show iframe
        if (!api_result || !api_result.features || !api_result.features.length) { return Spice.failed(ID); }
        
        var script = $('[src*="/js/spice/maps/stay/"]')[0],
        source = $(script).attr("src"),
        regex = new RegExp("maps/stay\/([^\/]+)"),
        query = source.match(regex)[1],
        decodedQuery = decodeURIComponent(query);
        
        // Mapbox sends back a bunch of places, just want the first one for now
        api_result = api_result.features[0];
        
        // Iframe params
        // Docs: https://www.stay22.com/embed
        var IFRAME_PARAMS = {
            address: decodedQuery,
            hidenavbar: 'true',
            mapstyle: 'googledefault',
            hideshare: 'true',
            hidenavbuttons: 'true',
            hidebrandlogo: 'true',
            hidespinner: 'true',
            hidefooter: 'true',
            zoom: 14
        };

        Spice.add({
            data: {
                url: 'https://www.stay22.com/embed/gm?' + jQuery.param(IFRAME_PARAMS)
            },
            id: ID,
            name: "Places",
            templates: {
                group: 'base',
                options: {
                    content: Spice.maps_stay.content,
                }
            },
            onShow: function(){
                Spice.getDOM(ID).find('#spice_maps_stay_iframe').on('load', function(){
                    Spice.getDOM(ID).addClass('is-loaded');
                });
            }
        });
    };
}(this));