(function(env) {
    "use strict";

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

    env.ddg_spice_search_code = function(api_result) {
        
        if(!api_result) {
            return Spice.failed('search_code');
        }

        var query = api_result.query;
        var data = api_result.results;

        if(!data.length || data.length === 0) {
            return Spice.failed('search_code');
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
            return Spice.failed('search_code');
        }

        result.title = formatTitle(result);
        result.subtitle = formatSubtitle(result);

        Spice.add({
            id: 'search_code',
            name: 'Answer',
            data: result,
            meta: {
                sourceUrl: 'https://searchcode.com/?q=' + query,
                sourceName: 'searchcode',
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
    }
}(this));
