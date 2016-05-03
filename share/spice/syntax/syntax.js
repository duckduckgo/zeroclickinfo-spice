(function (env) {
    "use strict";
    env.ddg_spice_syntax = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.length === 0) {
            return Spice.failed('syntax');
        }
        var query = getParameterByName('q');
        
        // Render the response
        Spice.add({
            id: "syntax",

            // Customize these properties
            name: "Syntax",
            data: api_result[0],
            meta: {
                sourceName: "SyntaxDB.com",
                sourceUrl: 'https://syntaxdb.com/reference/search?search=' + query
            },
            normalize: function(item) {
                var conceptInfo;
                conceptInfo.push({label: "Description", value: item.description});
                conceptInfo.push({label: "Syntax", value: item.syntax});
                
                return {
                    // customize as needed for your chosen template
                    title: item.concept_search,
                    infoboxData: conceptInfo,
                    url: 'https://syntaxdb.com/ref/' + api_result[0].language_permalink + '/' + api_result[0].concept_permalink
                };
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.syntax.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
