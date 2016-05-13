(function (env) {
    "use strict";
    env.ddg_spice_syntax = function(api_result) {
        if (!api_result || api_result.error || api_result.length == 0) {
            return Spice.failed('syntax');
        }
        var query = DDG.get_query().replace("syntax", '');
        Spice.add({
            id: "syntax",
            name: "Answer",
            data: api_result[0],
            meta: {
                sourceName: "SyntaxDB",
                sourceUrl: 'https://syntaxdb.com/reference/search?search=' +  query,
                sourceIconUrl: 'https://syntaxdb.com/images/favicon.ico'
            },
            normalize: function(item) {
                return {
                    title: item.concept_search,
                    subtitle: "Syntax",
                };
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.syntax.syntax,
                    moreAt: true
                }
            }
        });
    };
}(this));
