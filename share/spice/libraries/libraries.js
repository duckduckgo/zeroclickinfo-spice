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

    function formatTitle(result) {
        var formatted_title = result.name;
        if (result.displayname && result.displayname !== '') {
            formatted_title += ' (' + result.displayname + ')';
        }
        return formatted_title;
    }

    function formatSubtitle(result) {
        var formatted_subtitle = null;
        if (result.namespace && result.namespace !== '') {
            formatted_subtitle = result.namespace;
        }
        return formatted_subtitle;
    }


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

        result.title = formatTitle(result);
        result.subtitle = formatSubtitle(result);

        Spice.add({
            id: 'libraries',
            name: 'Answer',
            data: result,
            meta: {
                sourceUrl: 'https://libraries.io/api/search?q=' + libraries_query + '&api_key={{ENV{DDG_SPICE_LIBRARIES_IO_APIKEY}}}',
                sourceName: 'libraries.io'
            },
            normalize: function(item) {
                var subtitleArray = [];
                if (item.subtitle) {
                    subtitleArray.push(item.subtitle);
                }
                if (item.url && item.url !== '') {
                    subtitleArray.push({
                        href: item.url,
                        text: "Reference"
                    });
                }
                return {
                    title: item.title,
                    subtitle: subtitleArray
                };
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
