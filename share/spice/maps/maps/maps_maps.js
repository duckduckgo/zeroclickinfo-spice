DDG.require('maps',function(){
    ddg_spice_maps_maps = function(response) {

        if (!response || !response.features || !response.features.length) { return Spice.failed('maps_maps'); }

        Spice.add({
            data: response.features[0],
            id: "maps_maps",
            name: "maps",
            model: "Place"
        });

    };
});
