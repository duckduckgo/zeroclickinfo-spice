(function (env) {
    "use strict";        
    env.ddg_spice_launchpad_project = function(api_result){

        if (!api_result || !api_result.entries || api_result.error || api_result.total_size === 0) {
            return Spice.failed('launchpad_project');
        }
        
        if (api_result.total_size === 1) {
            var itemType = "Launchpad Package";
        }
        else {
            var itemType = "Launchpad Packages";
        }
        
        var query = DDG.get_query();
        query = query.replace(/launchpad ?project/, "");
        query = query.replace(/lp ?project/, "");
        
        DDG.require('moment.js', function() {
            Spice.add({
                id: "launchpad_project",
                name: "Software",
                data: api_result.entries,
                meta: {
                    itemType: itemType,
                    sourceName: "Launchpad",
                    sourceUrl: 'https://launchpad.net/+search?field.text=' + query,
                },
                templates: {
                    group: 'text',
                    detail: false,
                    item_detail: false,
                    options: {
                        moreAt: true
                    },
                    variants: {
                        tile: 'basic4'
                    }       
                },
                normalize: function(item) {
                    return {
                        title: item.name,
                        description: item.summary,
                        url: item.web_link
                    };
                }
            });
        });
    };
}(this));
