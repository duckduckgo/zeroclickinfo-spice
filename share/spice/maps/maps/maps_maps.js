DDG.require('maps',function(){
    ddg_spice_maps_maps = function(response) {
        
        if (!response) { return Spice.failed('maps'); }

        // OSM sends back a bunch of places, just want the first one for now
        response = response.features[0]; 
                                
        if (response.relevance < 0.9) { 
            return Spice.failed('maps'); 
        } 

        Spice.add({
            data: response,
            id: "maps",
            name: "maps",
            model: "Place"
        });

    };
});
