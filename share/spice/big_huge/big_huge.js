function ddg_spice_big_huge_antonym(api_result) {
  ddg_spice_big_huge_varinym(api_result, 'ant', 'Antonyms of ', true, '', '');
}
function ddg_spice_big_huge_related(api_result) {
  ddg_spice_big_huge_varinym(api_result, 'rel', 'Related to ', true, '', '');
}
function ddg_spice_big_huge_similar(api_result) {
  ddg_spice_big_huge_varinym(api_result, 'sim', 'Similar to ', true, '', '');
}
function ddg_spice_big_huge_synonym(api_result) {
  ddg_spice_big_huge_varinym(api_result, 'syn', 'Synonyms of ', true, '', '');
}

function ddg_spice_big_huge_varinym(api_result, mode, header, complete, modifier, content) {

  // Check if desired result exists in api_result
  if (JSON.stringify(api_result).indexOf(mode) === -1 ) {
    return;
  }

  api_result.mode = mode;
  api_result.header = header;

  var word = DDG.get_query().replace(/(synonyms?|antonyms?|similar|related)\s*(terms?|words?)?\s*(of|to|for)?\s*/, "");

  Spice.render({
    data:               api_result,
    header1 :           header + word,
    source_name :       'Big Huge THesaurus',
    source_url :        'http://words.bighugelabs.com/' + word,
    template_normal :   'big_huge',
    force_big_header :  true
  });
}

/*******************************
  Handlebars helpers
  *******************************/

// Determine which results to show
Handlebars.registerHelper("checkWords", function(options){

  var out = {
        results: []
      },
      wc,
      mode = this.mode;

  for (var wordClass in this) {
    if (this.hasOwnProperty(wordClass) &&
        this[wordClass].hasOwnProperty(mode)) {

      var obj = {
        heading:  wordClass.charAt(0).toUpperCase() + wordClass.slice(1)+"s",
        words:    this[wordClass][mode].join(", ")
      };

      out.results.push(obj);
    }

    if (mode === "sim" &&
        this[wordClass].hasOwnProperty("syn")) {

      var obj = {
        heading:  "Similar " + wordClass+"s",
        words:    this[wordClass].syn.join(", ")
      };

      out.results.push(obj);
    }
  }

  return options.fn(out);

});