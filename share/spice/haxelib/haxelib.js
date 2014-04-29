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
                sourceIconUrl   : 'http://haxe.org/img/haxe2/favicon.ico',
                sourceUrl       : 'http://lib.haxe.org/p/' + encodeURIComponent(response.info.name),
                sourceName      : 'Haxelib'
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
