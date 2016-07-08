(function (env) {
    "use strict";
    env.ddg_spice_what3words = function (api_result) {

        if (!api_result || !api_result.geometry) {
            return Spice.failed('what3words');
        }

        var location =  encodeURIComponent( api_result.geometry.lng + "," + api_result.geometry.lat );
        $.getJSON('/js/spice/what3words_arcgis/' + location, function(data) {
            if (data.address){
                DDG.require('maps', function () {
                    Spice.add({
                        id: "what3words",
                        name: "Map",
                        data: {
                            name: api_result.words,
                            lat: api_result.geometry.lat,
                            lon: api_result.geometry.lng,
                            displayLatLon: api_result.geometry.lat + ", " + api_result.geometry.lng,
                            address: data.address.Address + ", " + data.address.City
                        },
                        model: 'Place',
                        view: 'Map',
                        meta: {
                            zoomLevel: 15,
                            sourceName: "What3Words",
                            sourceUrl: api_result.map
                        },
                        templates: {
                            group: 'map',
                            options: {
                                moreAt: true
                            }
                        }
                    });
                });
            }
        });
    };
}(this));
