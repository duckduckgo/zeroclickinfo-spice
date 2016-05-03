(function (env) {
    "use strict";
    env.ddg_spice_syntax = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('syntax');
        }

        // Render the response
        Spice.add({
            id: "syntax",

            // Customize these properties
            name: "AnswerBar title",
            data: api_result,
            meta: {
                sourceName: "SyntaxDB.com",
                sourceUrl: 'https://syntaxdb.com/ref/' + api_result.name
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title: item.concept_search,
                    description: item.description
                    syntax: item.syntax
                };
            },
            templates: {
                group: 'your-template-group',
                options: {
                    content: Spice.syntax.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
