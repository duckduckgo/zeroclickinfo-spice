(function (env) {
    "use strict";
    env.ddg_spice_word_of_the_day = function(api_result){
        
        if (!api_result || api_result.error) {
            return Spice.failed('word_of_the_day');
        }
        
        Spice.add({
            id: "word_of_the_day",
            name: "Answer",
            data: api_result,
            meta: {
                sourceUrl: 'https://www.wordnik.com/word-of-the-day',
                sourceName: 'Wordnik'
            },
            normalize: function(item) {
                return {
                    url: 'https://www.wordnik.com/word-of-the-day',
                    title: api_result.word,
                    subtitle: api_result.definitions[0].partOfSpeech,
                    description: api_result.definitions[0].text
                };
            },
            templates: {
                group: 'info'
            }
        });
    };
}(this));
