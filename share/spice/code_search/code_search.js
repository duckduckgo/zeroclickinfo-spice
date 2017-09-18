(function(env){
    "use strict";

    env.ddg_spice_code_search = function (api_result) {
        if (!api_result || api_result.Defs.length === 0) {
            return Spice.failed('code_search');
        }

        var query = api_result.Defs[0].Repo;

        Spice.add({
            id: 'code_search',
            name: "Software",
            data: api_result.Defs,
            normalize: function (item) {
                return {
                    type: item.Data.Type,
                    name: item.Data.Name,
                    info: item.DocHTML.__html
                };
            },
            meta: {
                sourceUrl: 'https://' + query,
                sourceIconUrl: 'https://assets-cdn.github.com/favicon.ico',
                sourceName: 'GitHub'
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.code_search.content,
                    moreAt: true
                }
            }
        });
    }
}(this));
