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
                options: {
                    content: Spice.urban_dictionary.content,
                    moreAt: true
                }
            },
            normalize: function(item) {
                return {
                    definition: item.definition.replace(/(\r?\n)+/gi, ' ')
                };
            }
        });

        // Call the Wordnik API to get the audio.
        $.getScript(dictionary_path + "/audio/" + word);
    }
    
    Handlebars.registerHelper("UD_example", function(example) {
        var exampleList = example.replace(/(\r?\n)+/gi, '</div><div class="example">')
        return new Handlebars.SafeString('<div class="example">' + exampleList + '</div>');
    });
}(this));