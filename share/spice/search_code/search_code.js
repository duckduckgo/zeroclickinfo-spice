(function(env) {
    "use strict";
    env.ddg_spice_search_code = function(api_result) {

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

        result.title = formatTitle(result);
        result.subtitle = formatSubtitle(result);

        Spice.add({
            id: 'search_code',
            name: 'Answer',
            data: result,
            meta: {
                sourceURL: 'https://searchcode.com/?q=' + query,
                sourceName: 'search[code]',
            },
            normalize: function(item) {
                return {
                    title: item.title,
                    subtitle: item.subtitle
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
