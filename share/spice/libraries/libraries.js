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

        var data = api_result.results;

        if(!data.length || data.length === 0) {
            return Spice.failed('libraries');
        }

        var result;
        for (var i = 0; i < data.length; i++) {
            var checkRelevancy = [data[i].name, data[i].displayname, data[i].namespace].join(" ");
            if (DDG.isRelevant(checkRelevancy, [], 2)) {
                result = data[i];
                break;
            }
        }

        if (!result) {
            return Spice.failed('libraries');
        }

        Spice.add({
            id: 'libraries',
            name: 'Answer',
            //data: result,
            data: api_result.results,
            meta: {
                sourceUrl: 'https://libraries.io/api/search?q=' + libraries_query + '&api_key={{ENV{DDG_SPICE_LIBRARIES_IO_APIKEY}}}',
                sourceName: 'libraries.io'
            },
            normalize: function(item) {
                    return {
                        name: item.name,
                        platform: item.platform,
                        description: item.description,
                        url: item.homepage,
                        latest: item.latest_release_number
                    }
                },
            templates: {
                group: 'text',
                options: {
                    content: Spice.search_code.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
