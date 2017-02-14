(function (env) {
    "use strict";
    env.ddg_spice_npm = function(api_result){

        if (!api_result || api_result.error || api_result.results.length === 0) {
            return Spice.failed('npm');
        }
        
        var script = $('[src*="/js/spice/npm/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/npm\/([^\/]*)/)[1];

        // if query still has both items from handle remainder, remove $clean version
        if (query.indexOf('/' !== -1)) {
            query = query.split('/')[0];
        }       
        
        

        Spice.add({
            id: "npm",
            name: "Software",
            data: api_result.results,
            meta: {
                sourceName: "npmjs",
                itemType: (api_result.results.length === 1) ? 'npm package' : 'npm packages',
                sourceUrl: 'https://www.npmjs.com/search?q=' + query
            },
            normalize: function(item) {
                
                return {
                    title: item.name[0],
                    subtitle: "version: " + item.version[0],
                    description: item.description[0],
                    url: "https://www.npmjs.com/package/" + item.name[0],
                    rating: item.rating[0].toFixed(2),
                    author: item.author[0]
                }
            },

            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    footer: Spice.npm.footer
                },
                variants: {
                    tile: 'basic4'
                }
            }
        });
    };
}(this));