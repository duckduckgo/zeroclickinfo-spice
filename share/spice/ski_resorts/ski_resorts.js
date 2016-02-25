(function (env) {
    "use strict";
    env.ddg_spice_ski_resorts = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('ski_resorts');
        }

        var lon = (Math.round(api_result.location[0] * 100) / 100).toFixed(2);
        var lat = (Math.round(api_result.location[1] * 100) / 100).toFixed(2);
    
        DDG.require('maps', function() {
            Spice.add({
                id: api_result.name,
                name: "Ski Resort",
                model: 'Place',
                view: 'Map',
                templates: {
                    item: 'places_item',
                    detail: 'places_detail'
                },
                data: [{
                    id: api_result.name,
                    name: api_result.title,
                    url: 'http://www.piste.io/' + api_result.name,
                    image: 'http://www.piste.io/preview/' + api_result.name + '.jpg',
                    ratingImageURL: 'http://www.piste.io/favicon.ico',
                    address_lines: [
                        'Ski resort in ' + api_result.countryName,
                        '32 novice runs',
                        '16 intermediate runs',
                        '8 expert runs'
                    ],
                    city: 'New York City',

                    lon: lon,
                    lat: lat
                }],
                meta: {
                    zoomLevel: 8,
                    sourceName: "Show piste map",
                    sourceUrl: 'http://www.piste.io/' + api_result.name
                }
            });
        });
    };
}(this));
