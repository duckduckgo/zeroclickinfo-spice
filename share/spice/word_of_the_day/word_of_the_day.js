(function (env) {
    "use strict";
    env.ddg_spice_word_of_the_day = function(api_result){
        
        if (!api_result || api_result.error) {
            return Spice.failed('word_of_the_day');
        }
        
        Spice.add({
            id: "word_of_the_day",
            name: "Answer",
            data: {
                word: api_result.word,
                definitions: api_result.definitions
            },
            meta: {
                sourceUrl: 'https://www.wordnik.com/word-of-the-day',
                sourceName: 'Wordnik'
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.word_of_the_day.content
                }
            }
        });
    };
}(this));

// We should shorten the part of speech before displaying the definition.
Spice.registerHelper("Dictionary_formatPartOfSpeech", function(text) {
    "use strict";
    
    var parts_of_speech = {
        "interjection": "interj.",
        "noun": "n.",
        "verb-intransitive": "v.",
        "verb-transitive": "v.",
        "adjective": "adj.",
        "adverb": "adv.",
        "verb": "v.",
        "pronoun": "pro.",
        "conjunction": "conj.",
        "preposition": "prep.",
        "auxiliary-verb": "v.",
        "undefined": "",
        "noun-plural": "n.",
        "abbreviation": "abbr.",
        "proper-noun": "n."
    };

    return parts_of_speech[text] || text;
});

// Make sure we replace xref to an anchor tag.
// <xref> comes from the Wordnik API.
Spice.registerHelper("Dictionary_formatDefinition", function(text) {
    "use strict";

    // Replace the xref tag with an anchor tag.
    return text.replace(/<xref>([^<]+)<\/xref>/g,"<a class='reference' href='https://www.wordnik.com/words/$1'>$1</a>");
});