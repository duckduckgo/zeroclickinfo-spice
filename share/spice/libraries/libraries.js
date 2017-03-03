(function(env) {
    "use strict";
    var search_items = DDG.get_query().split(" ");

    function use_this(search_query) {
        return DDG.isRelevant(search_query, [
            'go', 
            'elm', 
            'wordpress', 
            'atom'
            'homebrew'
            'elm'
            'scala'
            'dart'
            'groovy'
            'emacs'
            'pypi'
            'bower'
        ], 1, 0);
    }

    var libraries_query = search_items.filter(use_this);


    env.ddg_spice_libraries = function(api_result){

        if (!api_result || !api_result.count) {
            return Spice.failed('libraries');
        }
    Spice.add({
            id: "libraries",
            name: 'Software',
            data: api_result.results,
            meta: {
                search_term:libraries_query,
                sourceName: "libraries.io",
                sourceUrl: 'https://libraries.io/api/search \
                &api_key={{ENV{DDG_SPICE_LIBRARIES_IO_APIKEY}}}?q=' \
                + libraries_query
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
                    return {
                        name: item.name,
                        platform: item.platform,
                        description: item.description,
                        url: item.homepage,
                        latest: item.latest_release_number
                    }
                }
        });
    };
}(this));
