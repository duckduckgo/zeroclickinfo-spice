(function (env) {
    "use strict";
    env.ddg_spice_ski_resorts = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('ski_resorts');
        }
    
        DDG.require('maps', function() {
            Spice.add({
                id: api_result.name,
                name: "Ski Resort",
                model: 'Place',
                view: 'Map',
                templates: {
                    group: 'places',
                    item: false
                },
                data: api_result,
                normalize: function(data){
                    return {
                        id: data.name,
                        name: data.title,
                        url: 'http://www.piste.io/' + data.name,
                        image: 'http://www.piste.io/preview/' + data.name + '.jpg',
                        ratingImageURL: 'http://www.piste.io/favicon.ico',
                        // Not clear why `address` is needed, as we use `address_lines` below
                        // but without it no address is displayed
                        address: 'Ski resort in ' + data.countryName,
                        address_lines: [
                            'Ski resort in ' + data.countryName,
                            '32 novice runs',
                            '16 intermediate runs',
                            '8 expert runs'
                        ],
                        city: 'New York City',
                        lon: (Math.round(data.location[0] * 100) / 100).toFixed(2),
                        lat: (Math.round(data.location[1] * 100) / 100).toFixed(2)
                    }
                },
                meta: {
                    zoomLevel: 8,
                    sourceName: "Show piste map",
                    sourceUrl: 'http://www.piste.io/' + api_result.name
                }
            });
        });
    };
}(this));
