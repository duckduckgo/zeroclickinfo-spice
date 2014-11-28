(function (env) {
    "use strict";

    env.ddg_spice_in_every_lang = function(api_results){

        if(!api_results) {
            return Spice.failed("in_every_lang");
        }
        
        var script = $('[src*="/js/spice/in_every_lang/"]')[0];
        var source = $(script).attr("src");
        var matches = source.match(/in_every_lang\/[^\/]+\/([^\/]*)/) || [];

        if(matches.length) {
            var query = decodeURIComponent(matches[1]);
        }

        var selectedLanguage;
        if(matches.length && typeof(api_results[query]) !== "undefined") {
            selectedLanguage = query;
        } else {
            return Spice.failed('in_every_lang');
        }

        // Use the searched for language - if not, just use the first language returned
        var solution = api_results[selectedLanguage];
        var solutionUrl = solution.url;

        Spice.add({
            id: "in_every_lang",
            name: "Code Snippet",
            data: solution,
            meta: {
                sourceName: "ineverylang.com",
                sourceUrl: solutionUrl
            },

            normalize: function(item) {
                return {
                    title: solution.puzzle.prettyName,
                    subtitle: selectedLanguage 
                }    
            },

            templates: {
                group: 'text',
                options: {
                    content: Spice.in_every_lang.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
