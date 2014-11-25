(function (env) {
    "use strict";

    env.ddg_spice_in_every_lang = function(api_results){

      var script = $('[src*="/js/spice/in_every_lang/"]')[0];
      var source = $(script).attr("src");
      var matches = source.match(/in_every_lang\/[^\/]+\/([^\/]*)/) || [];

      if(matches.length) {
        var query = decodeURIComponent(matches[1]);
      }

      var selectedLanguage = false;
      if(matches.length && typeof(api_results[query]) !== "undefined") {
        selectedLanguage = query;
      }

      // Use the searched for language - if not, just use the first language returned
      var solution = selectedLanguage ? api_results[selectedLanguage] : api_results[Object.keys(api_results)[0]];
      var solutionUrl = selectedLanguage ? solution.url : "http://www.ineverylang.com/"+solution.puzzle.puzzleDir;

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
                  title: solution.title
              }  
          },

          templates: {
              group: 'base',
              options: {
                  content: Spice.in_every_lang.content,
                  moreAt: true
              }
          }
      });
    };
}(this));
