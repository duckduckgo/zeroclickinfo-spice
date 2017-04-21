(function (env) {
    "use strict";
    
    var packageByNameExists;
    
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
        
        // if the first package matches the exact query, then we'll return a text view
        // For broader queries where there isn't a match, we will return the tile view
        if (api_result.results[0].package.name === query) {
            packageByNameExists = true;
        };
        
    DDG.require('moment.js', function(moment) {
        
            var tile_template = {
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
            
            var text_template =  {
                group: 'text',
                options: {
                    content: Spice.npm.content,
                    moreAt: true,
                    moreText: {
                        href: 'https://www.npmjs.com/package/' + query
                    }
                }
            }
            
            // Chose the template based on template match
            var template = packageByNameExists ? text_template : tile_template;
            var sourceURL = packageByNameExists ? 
                                'https://www.npmjs.com/package/' + query : 
                                'https://www.npmjs.com/search?q=' + query;

            Spice.add({
                id: "npm",
                name: "Software",
                data: packageByNameExists ? api_result.results[0] : api_result.results,
                meta: {
                    sourceName: "npmjs",
                    itemType: (api_result.total === 1) ? 'npm package' : 'npm packages',
                    sourceUrl: sourceURL
                },
                normalize: function(item) {
                    
                    return {
                        title: item.package.name,
                        subtitle: "version: " + item.package.version + ' | ' + item.package.publisher.username,
                        description: item.package.description,
                        url: item.package.links.npm,
                        lastUpdated: moment(item.package.date).fromNow()
                    }
                },

                templates: template
            });
        });
    };
}(this));