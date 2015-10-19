(function (env) {
    "use strict";
    env.ddg_spice_cocoapods = function(api_result){

       
        if (!api_result || api_result.error) {
            return Spice.failed('cocoapods');
        }
        
        // Get the original query.
        var query = DDG.get_query().replace("cocoapods", "");
        
        // Render the response
        Spice.add({
            id: "cocoapods",
            name: "Software",
            data: api_result,
            meta: {
                sourceName: "CocoaPods",
                sourceUrl: 'https://cocoapods.org/?q=' + encodeURIComponent(query),
                sourceIconUrl: 'http://cocoapods.org/favicons/favicon.ico',
                total: api_result.length
            },
            
            normalize: function(item) {
                return {
                    title: item.id,
                    subtitle: item.version,
                    url: item.link,
                    description: item.summary,
                    platforms: item.platforms.join(', ').toUpperCase()
                }  
            },
            
            templates: {
                group: 'list',
                detail: false,
                item_detail: false,
                variants: {
                    tile: 'basic4',
                    tileSnippet: 'small'
                },
                options: {
                    footer: Spice.cocoapods.footer
                }
            }
        });
    };
}(this));
