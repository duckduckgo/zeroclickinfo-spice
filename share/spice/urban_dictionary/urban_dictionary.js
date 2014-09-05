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
                group: 'base',
                detail: Spice.urban_dictionary.detail,
                options: {
                    moreAt: true
                }
            },
            normalize: function(item) {
                var infoboxData = [];

                for(var i = 0; i < response.tags.length; i++) {
                    infoboxData.push({
                        label: response.tags[i]
                    });
                }

                return {
                    definition: item.definition.replace(/(\r?\n)+/gi, ' '),
                    example: item.example.split(/\r?\n/),
                    infobox: infoboxData
                };
            }
        });
    }
}(this));