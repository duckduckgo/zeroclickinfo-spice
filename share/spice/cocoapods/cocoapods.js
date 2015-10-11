(function (env) {
    "use strict";
    env.ddg_spice_cocoapods = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('cocoapods');
        }
        
        // Get the original query.
        var script = $('[src*="/js/spice/cocoapods/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/cocoapods\/([^\/]*)/)[1];
        
        // Render the response
        Spice.add({
            id: "cocoapods",
            // Customize these properties
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
                    title: item.id + ' ' + item.version,
                    subtitle: item.platforms,
                    url: item.link,
                    description: item.summary
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
