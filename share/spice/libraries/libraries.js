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
            data: api_result.results,
            meta: {
                search_term: libraries_query,
                sourceName: 'libraries.io',
                sourceUrl: 'https://libraries.io/api/search?q=' + libraries_query + '&api_key={{ENV{DDG_SPICE_LIBRARIES_IO_APIKEY}}}'       
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,

                variants: {
                    tile: '2line',
                    tileSnippet: 'small'
                }
            },
            normalize: function(item) {
                if (item.name && item.description) {
                    return {
                        title: item.name,
                        subtitle: item.description,
                        url: item.homepage
                    }
                }
            }
        });
    };
}(this));
