// `ddg_spice_urban_dictionary` is a callback function that gets
// "urban dictionary cool" or "urban dictionary ROTFL."

// Note: This plugin can display adult content and profanity.
(function(env) {
    env.ddg_spice_urban_dictionary = function(response) {
        "use strict";

        if(!(response && response.result_type === "exact" && response.list && response.list[0])) {
            return Spice.failed('urban_dictionary');
        }

        var word = response.list[0].word;

        Spice.add({
            id: "urban_dictionary",
            name: "Dictionary",
            data: response.list[0],
            meta: {
                sourceUrl: 'http://www.urbandictionary.com/define.php?term=' + word,
                sourceName: 'Urban Dictionary'
            },
            templates: {
                group: 'info',
                options: {
                    moreAt: true,
                    content: Spice.urban_dictionary.content
                }
            },
            normalize: function(item) {
                if (response.tags.length) {
                    var infoboxData = [{ heading: 'Related Terms:' }],
                        i = 0,
                        term;

                    for (; term = response.tags[i]; i++) {
                        if (term !== word) {
                            infoboxData.push({
                                label: DDG.capitalizeWords(term),
                                url: window.location.origin + '/?q=ud+' + term + '&ia=dictionary' + kurl
                            });
                        }
                    }
                }

                return {
                    title: DDG.capitalizeWords(word),
                    definition: item.definition.replace(/(\r?\n)+/gi, ' '),
                    example: item.example,
                    infoboxData: infoboxData
                };
            }
        });
    }
}(this));
