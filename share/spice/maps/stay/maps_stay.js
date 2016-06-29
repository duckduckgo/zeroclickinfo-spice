(function (env) {
    "use strict";

    env.ddg_spice_maps_stay = function(api_result) {       
        var ID = 'maps_stay';

        if (!api_result || !api_result.features || !api_result.features.length) { return Spice.failed(ID); }
        
        var script = $('[src*="/js/spice/maps/stay/"]')[0],
        source = $(script).attr("src"),
        regex = new RegExp("maps/stay\/([^\/]+)"),
        query = source.match(regex)[1],
        decodedQuery = decodeURIComponent(query);

        // Mapbox sends back a bunch of places, just want the first one for now
        api_result = api_result.features[0];
        
        var IFRAME_PARAMS = {
            address: decodedQuery,
            hidenavbar: 'true',
            mapstyle: 'googledefault',
            hideshare: 'true',
            hidenavbuttons: 'true',
            hidebrandlogo: 'true',
            hidespinner: 'true'
        };
        

        Spice.add({
            data: {
                url: 'https://www.stay22.com/embed/gm?' + jQuery.param(IFRAME_PARAMS),
                width: '100%',
                height: '400'
            },
            id: ID,
            name: "Place",
            templates: {
                group: 'base',
                options: {
                    content: Spice.maps_stay.content,
                }
            }
        });

    };
}(this));