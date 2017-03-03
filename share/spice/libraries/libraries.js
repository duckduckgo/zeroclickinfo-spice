(function (env) {
    "use strict";
    
    var api_key = ;

    env.ddg_spice_libraries = function(api_result){

        if (!api_result || api_result.error || api_result.results.length === 0) {
            return Spice.failed('libraries');
        }
        
        var script = $('[src*="/js/spice/libraries/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/elm\/([^\/]*)/)[1];

    DDG.require('moment.js', function(moment) {
            Spice.add({
                id: "libraries",
                name: "Software",
                data: api_result,
                meta: {
                    sourceName: "Libraries",
                    sourceUrl: 'https://libraries.io/api/search&api_key={{ENV{DDG_SPICE_LIBRARIES_IO_APIKEY}}}?q=' + query
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

                console.log("item :", item)
                templates: {
                    group: 'text',
                    detail: true,
                    item_detail: true,
                    options: {
                        footer: Spice.libraries.footer
                    },
                    variants: {
                        tile: 'basic4'
                    }
                }
            });
        });
    };
}(this));