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
                    repo_url: item.repo,
                    infoboxData: [
                        {
                            heading: 'More Info:',
                        },
                        {
                            label: 'Repository',
                            value: item.name,
                            url: item.repo
                        },
                        {
                            label: 'File Name',
                            value: item.filename
                        },
                        {
                            label: 'Language',
                            value: item.language
                        },
                        {
                            label: 'Number of Lines',
                            value: item.linescount
                        },
                        {
                            label: 'File Location',
                            value: [item.location, item.filename].join('/')
                        }
                    ]
                };
            },
            meta: {
                sourceUrl: 'https://searchcode.com/?q=' + query + '&cs=true',
                sourceIconUrl: 'https://searchcode.com/static/favicon.ico',
                sourceName: 'searchcode'
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.code_search.content,
                    moreAt: true
                }
            }
        });
    }
}(this));
