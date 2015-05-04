(function(env){
    "use strict";

    env.ddg_spice_code_search = function (api_result) {

        if (!api_result || api_result.results.length === 0) {
            return Spice.failed('code_search');
        }

        var query = encodeURIComponent(api_result.query);

        Spice.add({
            id: 'code_search',
            name: "Software",
            data: api_result.results[0],
            normalize: function(item) {
                var lines = [];

                $.each(api_result.results[0].lines, function(k, v){
                    lines.push(v);
                });

                return {
                    lines: lines.join('\n'),
                    title: item.name,
                    url: item.url,
                    file_location: [item.location, item.filename].join('/'),
                    repo_url: item.repo
                };
            },
            meta: {
                sourceUrl: 'https://searchcode.com/?q=' + query + '&cs=true',
                sourceIconUrl: 'https://searchcode.com/static/favicon.ico',
                sourceName: 'searchcode'
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.code_search.content,
                    subtitle_content: Spice.code_search.subtitle,
                    moreAt: true
                }
            }
        });
    }
}(this));
