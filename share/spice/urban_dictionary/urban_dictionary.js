// `ddg_spice_urban_dictionary` is a callback function that gets
// "urban dictionary cool" or "urban dictionary ROTFL."

// Note: This plugin can display adult content and profanity.
(function(env) {
  env.ddg_spice_urban_dictionary = function(response) {
    "use strict";

    if (!(response && response.result_type === "exact"
          && response.list && response.list[0])) {
        return;
    }

    var word       = response.list[0].word;
    var definition = response.list[0].definition.replace(/(\r?\n)+/gi, '<br/>');

    Spice.add({
      id: "urban_dictionary",
      name: "Urban Dictionary",
      data: { definition: definition,
        itemType: word + " (Urban Dictionary)",
        sourceUrl       : 'http://www.urbandictionary.com/define.php?term=' + word,
        sourceName      : 'Urban Dictionary'
      },
      templates: {
        detail: Spice.urban_dictionary.detail,
      }
    });
  }
}(this));