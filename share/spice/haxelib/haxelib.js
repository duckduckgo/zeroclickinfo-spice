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
            normalize: function(item) {
                var boxData = [{heading: 'Package Information:'}];

                if (item.owner) {
                    boxData.push({
                        label: "Owner",
                        value: item.owner
                    });
                }

                if (item.website) {
                    boxData.push({
                        label: "Project Website",
                        value: item.website,
                        url: item.website
                    });
                }

                if (item.license) {
                    boxData.push({
                        label: "License",
                        value: item.license
                    });
                }
                if(item.versions && item.versions.length > 0) {
                    boxData.push({
                        label: "Changes",
                        value: item.versions[item.versions.length - 1].comments
                    })
                }
                
                if(item.tags && item.tags.length > 0) {
                    boxData.push({
                        label: "Tags",
                        value: item.tags.join(", ")
                    });
                }

                return {
                    title: item.name + " " + item.curversion,
                    subtitle: item.desc,
                    infoboxData: boxData,
                }
            },

            templates: {
                group: 'text',
                options: {
                    content: Spice.haxelib.content,
                    moreAt: true
                }
            }
        });
    }
}(this));
