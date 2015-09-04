DDG.require('maps',function(){
    ddg_spice_maps_maps = function(response) {

        if (!response || !response.length) { return Spice.failed('maps_maps'); }

        // OSM sends back a bunch of places, just want the first one for now
        response = [response[0]];

        if (!DDG.isRelevant(response[0].display_name.toLowerCase())) {
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
