(function (env) {
    "use strict";
    
    const api_key = "226b0da728d94d782063c1820f9649db";

    env.ddg_spice_libraries_io = function(api_result){

        if (!api_result || api_result.error || api_result.results.length === 0) {
            return Spice.failed('libraries_io');
        }
        
        var script = $('[src*="/js/spice/libraries_io/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/libraries_io\/([^\/]*)/)[1];

        // if query still has both items from handle remainder, remove $clean version
        if (query.indexOf('/' !== -1)) {
            query = query.split('/')[0];
        }
// Project search:       
// GET https://libraries.io/api/search?q=grunt&api_key=226b0da728d94d782063c1820f9649db

    DDG.require('moment.js', function(moment) {
            Spice.add({
                id: "Libraries.io",
                name: "Software",
                data: api_result.results,
                meta: {
                    sourceName: "Libraries.io",
                    itemType: (api_result.total === 1) ? 'libraries_io repo' : 'libraries_io repos',
                    sourceUrl: 'https://libraries.io/api/search?q=' + query + "&api_key=" + api_key
                },
                normalize: function(item) {
                    
                    return {
                        name: item.name,
                        platform: item.platform,
                        description: item.description,
                        url: item.homepage,
                        latest: item.latest_release_number
                        lastUpdated: moment(item.latest_release_published_at).fromNow()
                    }
                },

                templates: {
                    group: 'text',
                    detail: false,
                    item_detail: false,
                    options: {
                        footer: Spice.libraries_io.footer
                    },
                    variants: {
                        tile: 'basic4'
                    }
                }
            });
        });
    };
}(this));