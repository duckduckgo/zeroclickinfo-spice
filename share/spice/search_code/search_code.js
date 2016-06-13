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

        function formatName(result) {
            var formatted_name = result.name;

            if ((result.displayname && result.displayname !== '') || (result.namespace && result.namespace !== '')) {
                formatted_name += ' (';
                if (result.displayname && result.displayname !== '') {
                    formatted_name += result.displayname;
                }
                if (result.namespace && result.namespace !== '') {
                    formatted_name += (result.displayname ? ', ' : '') + result.namespace;
                }
                formatted_name += ')';
            }

            return formatted_name;
        }

        result.title = formatName(result);

        Spice.add({
            id: 'search_code',
            name: 'Answer',
            data: result,
            meta: {
                sourceURL: 'https://searchcode.com/?q=' + query,
                sourceName: 'search[code]',
                sourceIcon: true
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.search_code.search_code,
                    moreAt: true
                }
            }
        });
    }
}(this));
