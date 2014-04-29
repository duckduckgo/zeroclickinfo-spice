(function(env){
    env.ddg_spice_haxelib = function(response) {
        "use strict";

        if((!response || response.err)) {
    	   return; 
        }

        Spice.add({
            id: 'haxelib',
            name: "Haxelib",
            data: response.info,
            meta: {
                itemType: response.info.name + " ("+response.info.curversion+") by " + response.info.owner,
                sourceUrl       : 'http://lib.haxe.org/p/' + encodeURIComponent(response.info.name),
                sourceName      : 'Haxelib',
                sourceIcon      : true
            },
            template_group: 'info',
            templates: {
                options: {
                    content: Spice.haxelib.content
                }
            }
        });
    }
}(this));
