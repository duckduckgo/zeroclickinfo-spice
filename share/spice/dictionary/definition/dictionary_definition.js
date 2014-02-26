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

nrj("soundmanager2/script/soundmanager2-nodebug-jsmin.js", true);


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

    id: 'definition',

    $el: null,

    render: function(definitions) {
        var word = definitions[0].word;

        Spice.add({
            id: 'definition',
            name: 'Definition',

            data: {
                word: word,
                plural_form: this.plural_form,
                definitions: definitions,
                source_name: "Wordnik",
                source_url : "http://www.wordnik.com/words/" + word,
                content_template: Spice.dictionary_definition.dictionary_definition
            },

            relevancy: [
                {   
                    key: 'word',
                    min_length: word.length,
                    strict: false
                    // special: function(v) { return !!(DDG.get_query().match(new RegExp(v))); }
                }
            ],

            templates: {
                summary: DDG.templates.base
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

        if (!api_result || !api_result.length) { return; }

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
        if(api_result.length === 1 && singular) {
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

        // Replace the, rather lame, non-hyphenated version of the word.
        this.$el.find(".zci__def__word").text(hyphenated_word);
    },

    pronunciation: function(api_result) {
        "use strict";

        if(api_result && api_result.length > 0 && api_result[0].rawType === "ahd-legacy") {
            this.$el.find(".zci__def__pronunciation").html(api_result[0].raw);
        }
    },

    audio: function(api_result) {
        "use strict";

        if (!api_result || !api_result.length) { return; }

        var is_failed = false,
            is_loaded = false,
            url = api_result[0].fileUrl, // default to the first audio file
            $play_button = this.$el.find(".zci__def__audio");

        // Try to find the audio url that was created by Macmillan (it usually sounds better).
        for (var i=0,r; r=api_result[i]; i++) {
            if (r.createdBy === "macmillan" && url === "") {
                url = r.fileUrl;
            }
        }

        $play_button.press = function(){ 
            this.addClass('is-playing');
            this.is_pressed = true; 
        };

        $play_button.depress = function(){ 
            this.removeClass('is-playing');
            this.is_pressed = false;
        }

        // Play the sound when the icon is clicked. Do not let the user play
        // without window.soundManager.
        $play_button.click(function() {
            if(is_failed) {
                $play_button.press();
                setTimeout($play_button.depress, 1000);
            } else if(!$play_button.is_pressed && is_loaded) {
                $play_button.press();
                soundManager.play("dictionary-sound");
            }
        });

        // Check if soundManager was already loaded. If not, we should load it.
        // See http://www.schillmania.com/projects/soundmanager2/demo/template/sm2_defer-example.html
        window.SM2_DEFER = true;

        // Initialize the soundManager object.
        window.soundManager = new SoundManager();
        soundManager.url = "/soundmanager2/swf/";
        soundManager.flashVersion = 9;
        soundManager.useFlashBlock = false;
        soundManager.useHTML5Audio = false;
        soundManager.useFastPolling = true;
        soundManager.useHighPerformance = true;
        soundManager.multiShotEvents = true;
        soundManager.ontimeout(function() {
            is_failed = true;
            $play_button.depress();
        });
        soundManager.beginDelayedInit();

        // when it's ready, load the sound:
        soundManager.onready(function(){
            var sound = soundManager.createSound({
                id: "dictionary-sound",
                url: "/audio/?u=" + url,
                onfinish: function() {
                    $play_button.depress();
                    soundManager.stopAll();
                },
                ontimeout: function() {
                    is_failed = true;
                    $play_button.depress();
                },
                whileplaying: function() {
                    // We add this just in case onfinish doesn't fire.
                    if(this.position === this.durationEstimate) {
                        soundManager.stopAll();
                        $play_button.depress();
                    }
                },
                onload: function(success){
                    if(!success){ return; }

                    is_loaded = true;

                    // Set icon.
                    $play_button.html("▶");
                    $play_button.addClass('is-loaded');
                }
            });

            sound.load();
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
Spice.registerHelper("formatPartOfSpeech", function(text) {
    "use strict";

    return ddg_spice_dictionary.parts_of_speech[text] || text;
});

// Make sure we replace xref to an anchor tag.
// <xref> comes from the Wordnik API.
Spice.registerHelper("formatDefinition", function(text) {
    "use strict";

    // Replace the xref tag with an anchor tag.
    return text.replace(/<xref>([^<]+)<\/xref>/g,"<a class='reference' href='https://www.wordnik.com/words/$1'>$1</a>");
});
