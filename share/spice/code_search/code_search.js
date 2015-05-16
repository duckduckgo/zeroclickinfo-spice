(function(env){
    "use strict";

    env.ddg_spice_code_search = function (api_result) {

        if (!api_result || !api_result.results.length === 0) {
            return Spice.failed('code_search');
        }

        var query = encodeURIComponent(api_result.query);

        var keys = [];

        $.each(api_result.results[0].lines, function(k, v){
            keys.push(k)
        });

        Spice.add({
            id: 'code_search',
            name: "Software",
            data: {
                record_data: api_result.results[0].lines,
                record_keys: keys
            },
            meta: {
                sourceUrl: 'https://searchcode.com/?q=' + query + '&cs=true',
                sourceIconUrl: 'https://searchcode.com/static/favicon.ico',
                sourceName: 'searchcode'
            },
            templates: {
                group: 'base',
                options: {
                    content: 'record',
                    moreAt: true
                }
            }
        });
    }

    Spice.registerHelper("stripNewline", function(text){
        return text.replace(/\r/g, "");
    });
}(this));
