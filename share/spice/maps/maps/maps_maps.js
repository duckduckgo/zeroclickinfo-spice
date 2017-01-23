DDG.require('maps',function(){
    ddg_spice_maps_maps = function(response) {

        if (!response || !response.features || !response.features.length) { return Spice.failed('maps_maps'); }

        // TEMP: disable relevancy and pass all results through
        // for map module experiment:
        if (DDG.opensearch.installed.experiment === 'map_module' && DDG.opensearch.installed.variant === 'a') {
            return Spice.add({
                data: response.features,
                id: 'maps_maps',
                name: 'maps',
                model: 'Place'
            });
        }

        // Mapbox sends back a bunch of places, just want the first one for now
        response = response.features[0];

        var skipArray = [ "directions", "map", "maps", "st", "street", "ave", "avenue", "dr", "drive", "pl", "place", "apt", "suite" ];

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
