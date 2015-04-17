DDG.require('maps',function(){
    ddg_spice_maps_maps = function(d) {
        
        if (!d || !d.length) { return Spice.failed('maps'); }

        console.log("RAW MAP OBJECT %o", d);

        d = [d[0]]; // OSM sends back a bunch of places, just want the first one for now
                                
        if (!DDG.isRelevant(d[0].display_name.toLowerCase())) { 
            console.log("Maps failed relevancy", { log: "duckbar" });
            return Spice.failed('maps'); 
        } 
        
        Spice.add({
            data: d,
            id: "maps",
            name: "maps",
            model: "Place"
        });

    };
});
