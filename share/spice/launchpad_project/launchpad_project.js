(function (env) {
    "use strict";        
    env.ddg_spice_launchpad_project = function(api_result){

        if (!api_result || !api_result.entries || api_result.error || api_result.total_size === 0) {
            return Spice.failed('launchpad_project');
        }
        
        //display "Launchpad Porject" if there is only one project returned
        if (api_result.total_size === 1) {
            var itemType = "Launchpad Project";
        }
        else {
            var itemType = "Launchpad Projects";
        }
        
        var query = DDG.get_query();
        //strips out triggers and trailing whitespace from query
        query = query.replace(/launchpad ?project /, "");
        query = query.replace(/lp ?project /, "");
        
        DDG.require('moment.js', function() {
            Spice.add({
                id: "launchpad_project",
                name: "Software",
                data: api_result.entries,
                meta: {
                    itemType: itemType,
                    sourceName: "Launchpad",
                    sourceUrl: 'https://launchpad.net/+search?field.text=' + query
                },
                templates: {
                    group: 'text',
                    detail: false,
                    item_detail: false,
                    options: {
                        footer: Spice.launchpad_project.footer
                    },
                    variants: {
                        tile: 'basic4'
                    }       
                },
                normalize: function(item) {
                    return {
                        title: item.name,
                        description: item.summary,
                        url: item.web_link,
                        //gets the owner from the html address of the owner link
                        owner: item.owner_link.replace("https://api.launchpad.net/devel/~", "")
                    };
                }
            });
        });
    };
}(this));
