DDG.require('maps',function(){
    ddg_spice_maps_maps = function(response) {
        var skipArray = [ "directions", "map", "maps", "st", "street", "ave", "avenue", "dr", "drive", "pl", "place", "apt", "suite" ];

        if (!response || !response.features || !response.features.length) { return Spice.failed('maps_maps'); }

        // if user is in map module experiment, and signal is high
        if (DDG.duckbar.canShowIAModules()) {
            // if top result returned doesn't have high relevance,
            // the rest won't either so spice should fail.
            if (response.features[0].relevance < 0.6) {
                if ((response.features[0].place_name && DDG.isRelevant(response.features[0].place_name.toLowerCase(), skipArray))) {
                    // if relevance < .6 but DDG.isRelevant returns true,
                    // only allow first result through (since isRelevant
                    // only looks at the first result)
                    response.features = [response.features[0]];
                } else {
                    return Spice.failed('maps_maps');
                }
            } else {
                // filter out results with < 0.6 relevance
                response.features = response.features.filter(function(el) {
                    return el.relevance > 0.6;
                });
            }

            return Spice.add({
                data: response.features,
                id: 'maps_maps',
                name: 'maps',
                model: 'Place',
                allowMultipleCalls: true
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
