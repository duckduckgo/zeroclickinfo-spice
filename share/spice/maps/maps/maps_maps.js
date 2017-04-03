DDG.require('maps',function(){
    ddg_spice_maps_maps = function(response) {
        var skipArray = [ "directions", "map", "maps", "st", "street", "ave", "avenue", "dr", "drive", "pl", "place", "apt", "suite" ];

        if (!response || !response.features || !response.features.length) { return Spice.failed('maps_maps'); }

        // if user is in map module experiment, and signal is high
        if (DDG.opensearch.installed.experiment === 'map_module' && DDG.opensearch.installed.variant === 'a') {
            // if top result returned doesn't have high relevance,
            // the rest won't either so spice should fail.
            if (response.features[0].relevance < 0.7 && !(response.features[0].place_name && DDG.isRelevant(response.features[0].place_name.toLowerCase(), skipArray))) {
                return Spice.failed('maps_maps');
            }

            return Spice.add({
                data: response.features,
                id: 'maps_maps',
                name: 'maps',
                model: 'Place'
            });
        }

        // Mapbox sends back a bunch of places, just want the first one for now
        response = response.features[0];

        if ( response.relevance < 0.9 && !( response.place_name && DDG.isRelevant(response.place_name.toLowerCase(), skipArray)) ) {
            return Spice.failed('maps_maps');
        }

        Spice.add({
            data: response,
            id: "maps_maps",
            name: "maps",
            model: "Place"
        });

    };
});
