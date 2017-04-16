(function(env) {
    "use strict";
    env.ddg_spice_tlds = function(api_result) {
        if(!api_result) {
            return Spice.failed('namecheap');
        }
        var item = api_result.ApiResponse.CommandResponse.gettldlist;
        if(!item) {
            return Spice.failed('namecheap');
        }
        /* extract data from JSON */
        
        var tldName = item.tldName;
        var tldType = item.tldType;
       
        var data = {
            tldType: tldType,
            tldName: tldName
        };
        Spice.add({
            id: 'namecheap',
            name: 'tldlist',
            data: data,
            meta: {
                sourceName: 'Namecheap',
                sourceUrl: "http://namecheap.com"
            },
            normalize: function(item) {
                return {
                    title: item.tldName,
                    subtitle: item.tldType
                };
            },
            templates: {
                group: 'text',
                options: {
                    
                    moreAt: true
                }
            }
        });
    };
}(this));
