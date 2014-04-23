(function(env) {
    env.ddg_spice_meta_cpan = function(api_response) {
        "use strict";

        if (!(api_response && api_response.author && api_response.version)) {
            return;
        }

        var query = DDG.get_query().replace(/\s*(metacpan|meta cpan|cpanm?)\s*/i, '').replace(/-/g, '::');
        var link = "search?q=" + encodeURIComponent(query);
        if (api_response.module && api_response.module.length > 0 && api_response.module[0].associated_pod) {
            link = "module/" + api_response.module[0].associated_pod;
        }

        Spice.add({
            id: "meta_cpan",
            name: "MetaCPAN",
            data: {response: api_response, list: ['Abstract','Author','Version','Description']},
            meta: {
                sourceName: "MetaCPAN",
                sourceUrl: 'https://metacpan.org/' + link,
            },

            normalize : function(item) {
                var desc = item.response.pod;
                return {
                    'Author': item.response.author || null,
                    'Description': ((desc.length > 340) ? desc.slice(0, 340) + ' ...' : null),
                    'Version': item.response.version || null,
                    'Abstract': item.response.abstract || null
                };
            },
            templates: {
                detail: DDG.templates.table_detail,
            }
        });
    }
}(this));


Handlebars.registerHelper("table-each", function(context, data, options) {
        console.log("context: %o", context);
        console.log("data: %o", data);
        console.log("options: %o", options);

        if (!context) return "";

        console.log("each helper: options.hash: %o", options.hash);

        var from = +options.hash.from || 0,
        to = +options.hash.to || context.length,
        result = "";

        if (to > context.length) to = context.length;
        if (from < 0) from = 0;

        for(var i = from; i < to; i++) {
            result += options.fn(context[i]);

        }
        console.log(result);
        return result
});