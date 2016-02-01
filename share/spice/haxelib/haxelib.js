(function(env){
    env.ddg_spice_haxelib = function(response) {
        "use strict";

        if((!response || response.err)) {
    	   return Spice.failed('haxelib'); 
        }

        Spice.add({
            id: 'haxelib',
            name: "Software",
            data: response.info,
            meta: {
                sourceIconUrl   : 'http://haxe.org/favicon.ico',
                sourceUrl       : 'http://lib.haxe.org/p/' + encodeURIComponent(response.info.name),
                sourceName      : 'Haxelib'
            },
            templates: {
		group: 'base',
                options: {
                    content: Spice.haxelib.content,
		    moreAt: true
                }
            }
        });
    }
}(this));
