// Description:
// Shows the definition of a word.
//
// Dependencies:
// Requires SoundManager2.
//
// Commands:
// define dictionary - gives the definition of the word "dictionary."
//
// Notes:
// ddg_spice_dictionary_definition - gets the definitions of a given word (e.g. noun. A sound or a combination of sounds).
// ddg_spice_dictionary_pronunciation - gets the pronunciation of a word (e.g. wûrd).
// ddg_spice_dictionary_audio - gets the audio file.
// ddg_spice_dictionary_reference - handles plural words. (Improve on this in the future.)

var ddg_spice_dictionary = {

    path: "/js/spice/dictionary",

    plural_form: null,

    parts_of_speech: {
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
    },

    id: 'dictionary_definition',

    $el: null,

    render: function(definitions) {
        var word = definitions[0].word;

        var q = DDG.get_query();

        Spice.add({
            id: 'dictionary_definition',
            name: 'Definition',
            signal: /definition|define|meaning/.test(q) ? 'high' : 'medium',
            data: {
                word: word,
                plural_form: this.plural_form,
                definitions: definitions
            },

            meta: {
                sourceName: "Wordnik",
                sourceUrl : "http://www.wordnik.com/words/" + word,
                attributionText: definitions[0].attributionText
            },

            // relevancy: {
            //     primary: [
            //         { key: 'word', min_length: word.length, strict: false }
            //     ]
            // },

            templates: {
                group: 'base',
                options: {
                    content: Spice.dictionary_definition.content
                }
            },

            onShow: function() {
                // on mobile devices, this loads the audio resources when the IA is shown.
                // otherwise the loading of the audio resources is deferred until the user clicks
                // the button and loading things and waiting for them to load takes to long and
                // the mobile browsers won't let us auto-play the audio after that:
                if (is_mobile_device) {
                    DDG.require('audio', function(){});
                }
            }
        });

        this.$el = Spice.getDOM(this.id);

        // Do not add hyphenation when we're asking for two words.
        // If we don't have this, we'd can have results such as "black• hole".
        if(!word.match(/\s/)) {
            $.getScript(this.path + "/hyphenation/" + (this.plural_form || word));
        }

        // Call the Wordnik API to display the pronunciation text and the audio.
        $.getScript(this.path + "/pronunciation/" + word);
        $.getScript(this.path + "/audio/" + word);
    },

    definition: function(api_result) {
        "use strict";

        if (!api_result || !api_result.length) { return Spice.failed('dictionary_definition'); }

        // Prevent jQuery from appending "_={timestamp}" in our url when we use $.getScript.
        // If cache was set to false, it would be calling /js/spice/dictionary/definition/hello?_=12345
        // and that's something that we don't want.
        $.ajaxSetup({ cache: true });

        // Wait, before we display the plugin, let's check if it's a plural
        // such as the word "cacti."
        // TODO: this doesn't work for a lot of cases: i.e. "apples", "birds", "bananas"
        var singular = api_result[0].text.match(/^(?:A )?plural (?:form )?of <xref>([^<]+)<\/xref>/i);

        // If the word is plural, then we should load the definition of the word
        // in singular form. The definition of the singular word is usually more helpful.
        if(singular) {
            this.plural_form = api_result[0].word;
            $.getScript(this.path + "/reference/" + singular[1]);
        } else {
            // Render the plugin if everything is fine.
            this.render(api_result);
        }
    },

    reference: function(api_result) {
        "use strict";

        if (!api_result || !api_result.length) { return; }

        this.render(api_result);
    },

    hyphenation: function(api_result) {
        "use strict";

        if (!api_result || !api_result.length) { return; }

        var hyphenated_word;

        for (var i=0,r; r=api_result[i]; i++) {
            if (i === r.seq) {
                if (hyphenated_word) {
                    hyphenated_word += "•" + r.text;
                } else {
                    hyphenated_word = r.text;
                }
            }
        }


        // Sometimes a word gets '||' at the beginning.
        // This removes that for us.
        hyphenated_word = hyphenated_word.replace(/^‖/, '');

        // Replace the, rather lame, non-hyphenated version of the word.
        this.$el && this.$el.find(".zci__def__word").text(hyphenated_word);
    },

    pronunciation: function(api_result) {
        "use strict";

        if(api_result && api_result.length > 0 && api_result[0].rawType === "ahd-legacy") {
            this.$el && this.$el.find(".zci__def__pronunciation").html(api_result[0].raw);
        }
    },

    audio: function(api_result) {
        "use strict";

        if (!api_result || !api_result.length || !this.$el) { return; }

        var url = api_result[0].fileUrl; // default to the first audio file

        // Try to find the audio url that was created by Macmillan (it usually sounds better).
        for (var i=0,r; r=api_result[i]; i++) {
            if (r.createdBy === "macmillan") {
                url = r.fileUrl;
            }
        }

        // Audio URL should go to DDG's proxy server for privacy reasons.
        url = '/audio/?u=' + url;

        this.playBtn = new DDG.Views.PlayButton({
            url: url,
            after: this.$el.find('.zci__def__pronunciation')
        });
    }
}


// Exposing methods globally:

// Dictionary::Definition will call this function.
// This function gets the definition of a word.
ddg_spice_dictionary_definition = ddg_spice_dictionary.definition.bind(ddg_spice_dictionary);

// Dictionary::Reference will call this function.
// This is the part where we load the definition of the
// singular form of the word.
ddg_spice_dictionary_reference = ddg_spice_dictionary.reference.bind(ddg_spice_dictionary);

// Dictionary::Hyphenation will call this function.
// We want to add hyphenation to the word, e.g., hel•lo.
ddg_spice_dictionary_hyphenation  = ddg_spice_dictionary.hyphenation.bind(ddg_spice_dictionary);

// Dictionary::Pronunciation will call this function.
// It displays the text that tells you how to pronounce a word.
ddg_spice_dictionary_pronunciation = ddg_spice_dictionary.pronunciation.bind(ddg_spice_dictionary);

// Dictionary::Audio will call this function.
// It gets the link to an audio file.
ddg_spice_dictionary_audio = ddg_spice_dictionary.audio.bind(ddg_spice_dictionary);



// We should shorten the part of speech before displaying the definition.
Spice.registerHelper("Dictionary_formatPartOfSpeech", function(text) {
    "use strict";

    return ddg_spice_dictionary.parts_of_speech[text] || text;
});

// Make sure we replace xref to an anchor tag.
// <xref> comes from the Wordnik API.
Spice.registerHelper("Dictionary_formatDefinition", function(text) {
    "use strict";

    // Replace the xref tag with an anchor tag.
    return text.replace(/<xref>([^<]+)<\/xref>/g,"<a class='reference' href='https://www.wordnik.com/words/$1'>$1</a>");
});
