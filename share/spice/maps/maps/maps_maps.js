DDG.require('maps',function(){
    ddg_spice_maps_maps = function(response) {
        
        if (!response) { return Spice.failed('maps'); }

        // OSM sends back a bunch of places, just want the first one for now
        response = response.features[0]; 
        
        Spice.add({
            data: response,
            id: "maps",
            name: "maps",
            model: "Place"
        });

    };
});
