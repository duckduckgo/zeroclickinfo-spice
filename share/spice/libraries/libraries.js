(function(env) {
    "use strict";
    var search_items = DDG.get_query().split(" ");

    function use_this(search_query) {
        return DDG.isRelevant(search_query, [
            'go', 
            'elm', 
            'wordpress', 
            'atom',
            'homebrew',
            'elm',
            'scala',
            'dart',
            'groovy',
            'emacs',
            'pypi',
            'bower'
        ], 1, 0);
    }

    var libraries_query = search_items.filter(use_this);

    env.ddg_spice_libraries = function(api_result) {
        
        if(!api_result) {
            return Spice.failed('libraries');
        }

        Spice.add({
            id: 'libraries',
            name: 'Software',
            data: api_result,
            meta: {
                search_term: libraries_query,
                total: api_result.length,
                sourceName: 'libraries.io',
                itemType: "Libraries.io Repos",
                sourceUrl: 'https://libraries.io/api/search?q=' + libraries_query + '&api_key={{ENV{DDG_SPICE_LIBRARIES_IO_APIKEY}}}'       
            },
            templates:{
                group: 'text',
                detail: false,
                item_detail: false,
                variants: {
                    tile: 'basic1',
                    tileTitle: '1line',
                    tileFooter: '2line',
                    tileSnippet: 'large'
                },
                options: {
                    footer: Spice.libraries.footer
                }
            },
            sort_fields: {
                stars: function(a, b) {
                    return a.stars > b.stars ? -1 : 1;
                }
            },
            sort_default: 'stars',
            normalize: function(item) {
                if (item.name && item.description) {
                    return {
                        title: item.name,
                        subtitle: item.platform,
                        description: item.description,
                        url: item.repository_url,
                        latest_release: item.latest_release_number
                    }
                }
            }
        });
    };
}(this));
