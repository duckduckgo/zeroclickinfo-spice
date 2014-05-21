(function(env){
    "use strict";

    env.ddg_spice_code_search = function (api_result) {

        if (!api_result.results.length === 0) {
            return Spice.failed('code_search');
        }

        var query = encodeURIComponent(api_result.query);

        Spice.add({
            id: 'code_search',
            name: "Software",
            data: api_result.results[0].lines,
            meta: {
                sourceUrl: 'http://searchco.de/?q=' + query + '&cs=true',
                sourceName: 'searchcode'
            },
            normalize: function(item){

                var keys = [];

                $.each(item, function(k, v){
                    keys.push(k)
                });

                return{
                    record_keys: keys
                };
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
