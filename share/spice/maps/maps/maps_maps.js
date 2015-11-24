DDG.require('maps',function(){
    ddg_spice_maps_maps = function(response) {

        if (!response || !response.features || !response.features.length) { return Spice.failed('maps_maps'); }

        // Mapbox sends back a bunch of places, just want the first one for now
        response = response.features[0];

        if (response.relevance < 0.9) {
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
