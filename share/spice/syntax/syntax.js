(function (env) {
    "use strict";
    env.ddg_spice_syntax = function(api_result) {
        
        function getParameterByName(name) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        }
        var script = $('[src*="/js/spice/syntax/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/syntax\/([^\/]+)/)[1],
            decodedQuery = decodeURIComponent(query);

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.length == 0) {
            return Spice.failed('syntax');
        }
        var query = getParameterByName('q');
        // Render the response
        Spice.add({
            id: "syntax",

            // Customize these properties
            name: "Programming",
            data: api_result[0],
            meta: {
                sourceName: "SyntaxDB.com",
                sourceUrl: 'https://syntaxdb.com/reference/search?search=' +  decodedQuery,
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
