(function (env) {
    "use strict";

    env.ddg_spice_earthquakes = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || !api_result.metadata || api_result.metadata.count == 0 || api_result.features.length == 0) {
            return Spice.failed('earthquakes');
        }

        // Render the response
        Spice.add({
            id: 'earthquakes',

            // Customize these properties
            name: 'Earthquakes',
            data: api_result.features,
            meta: {
                sourceName: 'USGS',
                primaryText: 'Recent Earthquakes',
                sourceUrl: 'http://earthquake.usgs.gov/earthquakes/map/'
            },
            normalize: function(item) {
                var imageUrl = [
                    "http://earthquake.usgs.gov/realtime/product/dyfi",
                    item.id,
                    item.properties.net,
                    item.properties.updated,
                    item.id + "_ciim.jpg"
                ].join("/");
                var placeName = item.properties.place.split(" of ");
                return {
                    // customize as needed for your chosen template
                    id: item.id,
                    name: item.properties.title,
                    address: placeName[1] || placeName[0],
                    url: item.properties.url,
                    image: imageUrl,
                    mag: item.properties.mag,
                    lon: item.geometry.coordinates[0],
                    lat: item.geometry.coordinates[1]
                };
            },
            templates: {
                group: 'places'
            }
        });
    };
}(this));
