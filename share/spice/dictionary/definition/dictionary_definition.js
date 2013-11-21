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
// dictionary_definition - gets the definitions of a given word (e.g. noun. A sound or a combination of sounds).
// dictionary_pronunciation - gets the pronunciation of a word (e.g. wûrd).
// dictionary_audio - gets the audio file.
// dictionary_reference - handles plural words. (Improve on this in the future.)

// Dictionary::Definition will call this function.
// This function gets the definition of a word.

function ddg_spice_dictionary_definition (api_result) {
    "use strict";

    // Check if we have results we need.
    if (!api_result || !api_result.length) return;

    var path = "/js/spice/dictionary",
        context = {
            definitions: api_result,
            word: api_result[0].word
        },
        original = context.word;

    // Load SoundManager JS Library, used to play pronunciation audio
    $.getScript("soundmanager2/script/soundmanager2-nodebug-jsmin.js");

    // Check if the word is a plural e.g "cacti"
    var singular = api_result[0].text.match(/^(?:A )?plural (?:form )?of <xref>([^<]+)<\/xref>/i);

    // If the word is plural, then we should load the definition of the word
    // in singular form. The definition of the singular word is usually more helpful.
    if (api_result.length === 1 && singular) {
        $.getJSON(path + "/reference/" + singular[1], function (api_result){

            if (!api_result && !api_result.length) return;
            context = {
                definitions:  api_result,
                pluralOf:  api_result[0].word,
                word:  original
            };

            render(context);
        });
    } else {
        render(context);
    }

    // Render result for display
    function render (context) {
        var singular = context.pluralOf || context.word;

        Spice.render({
            data              : context,
            header1           : "Definition (Wordnik)",
            force_big_header  : true,
            source_name       : "Wordnik",
            source_url        : "http://www.wordnik.com/words/" + context.word,
            template_normal   : "dictionary_definition",
            force_no_fold     : true
        });

        // Do not add hyphenation when we're asking for two words.
        // If we don't have this, we'd can have results such as "black• hole".
        if (!context.word.match(/\s/)) {
            $.getJSON(path + "/hyphenation/" + context.word, dictionary_hyphenation);
        }

        // Call the Wordnik API to display the pronunciation text and the audio.
        $.getJSON(path + "/pronunciation/" + singular, dictionary_pronunciation);
        $.getJSON(path + "/audio/" + singular, dictionary_audio);
    }


    // Dictionary::Hyphenation will call this function.
    // We want to add hyphenation to the word, e.g., hel•lo.
    function dictionary_hyphenation (api_result) {
        "use strict";

        var result = [];
        if (api_result && api_result.length > 0) {
            for (var i = 0; i < api_result.length; i += 1) {
                if (i === api_result[i].seq) {
                    result.push(api_result[i].text);
                }
            }
            // Replace the, rather lame, non-hyphenated version of the word.
            $("#hyphenation").html(result.join("•"));
        }
    };


    // Dictionary::Pronunciation will call this function.
    // It displays the text that tells you how to pronounce a word.
    function dictionary_pronunciation (api_result) {
        "use strict";

        if (api_result && api_result.length > 0 && api_result[0].rawType === "ahd-legacy") {
            $("#pronunciation").html(api_result[0].raw);
        }
    };


    // Dictionary::Audio will call this function.
    // It gets the link to an audio file.
    function dictionary_audio (api_result) {
        "use strict";

        var isFailed = false;
        var url = "";
        var $icon = $("#play-button");

        // Sets the icon to play.
        function resetIcon () {
            $icon.removeClass("widget-button-press");
        };

        // Sets the icon to stop.
        function pressIcon () {
            $icon.addClass("widget-button-press");
        };

        // Check if we got anything from Wordnik.
        if (api_result && api_result.length > 0) {
            // Find the audio url that was created by Macmillan (it usually sounds better).
            for (var i = 0; i < api_result.length; i += 1) {
                if (api_result[i].createdBy === "macmillan" && url === "") {
                    url = api_result[i].fileUrl;
                }
            }

            // If we don't find Macmillan, we use the first one.
            if (url === "") {
                url = api_result[0].fileUrl;
            }
        } else {
            return;
        }

        // Load the sound and set the icon
        var isLoaded = false;

        function loadSound () {
            // Set the sound file.
            var sound = soundManager.createSound({
                id: "dictionary-sound",
                url: "/audio/?u=" + url,
                onfinish: function() {
                    resetIcon();
                    soundManager.stopAll();
                },
                ontimeout: function() {
                    isFailed = true;
                    resetIcon();
                },
                whileplaying: function() {
                    // We add this just in case onfinish doesn't fire.
                    if (this.position === this.durationEstimate) {
                        resetIcon();
                        soundManager.stopAll();
                    }
                }
            });

            sound.load();
            isLoaded = true;

            // Set icon
            $icon.html("&#9658;");
            $icon.removeClass("widget-disappear");

            // Load the icon immediately if we know that the url exists.
            resetIcon();
        };

        // Initialize the soundManager object.
        function soundSetup () {
            window.soundManager = new SoundManager();
            soundManager.url = "/soundmanager2/swf/";
            soundManager.flashVersion = 9;
            soundManager.useFlashBlock = false;
            soundManager.useHTML5Audio = false;
            soundManager.useFastPolling = true;
            soundManager.useHighPerformance = true;
            soundManager.multiShotEvents = true;
            soundManager.ontimeout(function() {
                isFailed = true;
                resetIcon();
            });
            soundManager.beginDelayedInit();
            soundManager.onready(loadSound);
        };

        // Play the sound when the icon is clicked. Do not let the user play
        // without window.soundManager.
        $icon.click(function() {
            if (isFailed) {
                pressIcon();
                setTimeout(resetIcon, 1000);
            } else if (!$icon.hasClass("widget-button-press") && isLoaded) {
                pressIcon();
                soundManager.play("dictionary-sound");
            }
        });

        // Check if soundManager was already loaded. If not, we should load it.
        // See http://www.schillmania.com/projects/soundmanager2/demo/template/sm2_defer-example.html
        window.SM2_DEFER = true;
        soundSetup();
    };
};


// We should shorten the part of speech before displaying the definition.
Handlebars.registerHelper("part", function(text) {
    "use strict";

    var part_of_speech = {
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

    return part_of_speech[text] || text;
});

// Make sure we replace xref to an anchor tag.
// <xref> comes from the Wordnik API.
Handlebars.registerHelper("format", function(text) {
    "use strict";

    // Replace the xref tag with an anchor tag.
    text = text.replace(/<xref>([^<]+)<\/xref>/g,
                "<a class='reference' href='https://www.wordnik.com/words/$1'>$1</a>");

    return text;
});
