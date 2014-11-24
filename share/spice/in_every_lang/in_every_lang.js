(function (env) {
    "use strict";
    // Take the ineverylang.com standard language strings, and translate them into some more readable search query terms
    var language_translations = {
      "C": [" c"],
      "C++": ["c++", "cpp"],
      "C#": ["c#", "csharp"],
      "Erlang": ["erlang"],
      "Go": ["go"],
      "Haskell": ["haskell"],
      "Java": ["java"],
      "Javascript": ["javascript", "js", "jquery"],
      "MATLAB": ["mat"],
      "Objective-C": ["objc", "obj-c", "obc", "objective-c", "objectivec"],
      "Perl": ["perl"],
      "PHP": ["php"],
      "Python": ["python"],
      "R": [" r"],
      "Ruby": ["ruby"],
      "Scala": ["scala"],
      "Swift": ["swift"]
    };

    env.ddg_spice_in_every_lang = function(api_results){
      var query = DDG.get_query().toLowerCase();
      var lang;

      // Try to find which language the query is looking for
      for(lang in api_results) {
        var solution = api_results[lang];

        var langTranslations = language_translations[lang];

        var selectedLanguage = false;
        for(var i=0; i<langTranslations.length; i++) {
          var translation = langTranslations[i];

          if(translation.length === 2 && translation[0] === " ") {
            if(query[query.length - 1] == translation[1]) {
              selectedLanguage = lang;
              break;
            }
          } else if(query.indexOf(langTranslations[i]) > -1) {
            selectedLanguage = lang;
            break;
          }
       }

       if(selectedLanguage) break;

      }

      // Use the searched for language - if not, just use the first language returned
      var solution = selectedLanguage ? api_results[selectedLanguage] : api_results[Object.keys(api_results)[0]];
      var solutionUrl = selectedLanguage ? solution.url : "http://www.ineverylang.com/"+solution.puzzle.puzzleDir;

      var cleanLanguageName = solution.language.replace("++", "pp");

      Spice.add({
          id: "in_every_lang",
          name: cleanLanguageName+" Solution",
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
