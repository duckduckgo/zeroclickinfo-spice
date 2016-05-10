(function (env) {
    "use strict";
    env.ddg_spice_syntax = function(api_result) {
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.length == 0) {
            return Spice.failed('syntax');
        }
        var query = DDG.get_query().replace("syntax", '');
        // Render the response
        Spice.add({
            id: "syntax",
            // Customize these properties
            name: "Programming",
            data: api_result[0],
            meta: {
                sourceName: "SyntaxDB.com",
                sourceUrl: 'https://syntaxdb.com/reference/search?search=' +  query,
                sourceIconUrl: 'https://syntaxdb.com/images/favicon.ico'
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
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
