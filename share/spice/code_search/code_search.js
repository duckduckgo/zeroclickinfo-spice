(function(env){
    "use strict";

    env.ddg_spice_code_search = function (api_result) {

        if (!api_result.results.length === 0) {
            return Spice.failed('code_search');
        }

        var query = encodeURIComponent(api_result.query);

        Spice.add({
            id: 'code_search',
            name: "Code Search",
            data: api_result.results[0],
            meta: {
                sourceUrl: 'http://searchco.de/?q=' + query + '&cs=true',
                sourceName: 'search[code]'
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.code_search.content,
                    moreAt: true
                }
            }
        });
    }

    Spice.registerHelper("stripNewline", function(text){
        return text.replace(/\r/g, "");
    });
}(this));