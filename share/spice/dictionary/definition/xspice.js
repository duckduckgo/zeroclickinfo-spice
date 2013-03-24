require("/forvo/mediaelement-and-player.min.js", {async: false});
require("/forvo/mediaelementplayer.min.css", {async: true});

// This function gets the definition of a word.
var ddg_spice_dictionary_definition = function(api_result) {
    "use strict";

    // context is what we'll use for `Spice.render`.
    var context = {};

    // We should shorten the part of speech before displaying the definition.
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
        "undefined": ""
    };

    if (api_result && api_result.length > 0) {
        // Add the word to the context.
        context.word = api_result[0].word;
        context.words = [];

        // Add the part of speech and the definition to the context.
        for (var i = 0; i < api_result.length; i += 1) {
            context.words.push({
                part: part_of_speech[api_result[i].partOfSpeech] || api_result[i].partOfSpeech,
                definition: api_result[i].text
            });
        }

        // Display the data.
        Spice.render({
            data: context,
            force_big_header  : true,
            header1           : context.word + " (Definition)",
            source_name       : "Wordnik",
            source_url        : "http://www.wordnik.com/words/" + context.word,
            template_normal   : "dictionary",
            template_small    : "dictionary"
        });

        // Call Wordnik API to get the pronunciation text.
        require("/js/spice/dictionary/pronunciation/" + context.word, {async: true});

        // Call Wordnik API to get the audio file.
        require("/js/spice/dictionary/audio/" + context.word, {async: true});
    } else {
        // Remove the trigger word (only if it's at the start or at the end).
        var query = DDG.get_query().replace(/^(definition of\:?|define\:?|definition)|(define|definition)$/, "");

        // Remove excess spaces.
        query = query.replace(/(^\s+|\s+$)/g, "");

        require("/js/spice/dictionary/fallback/" + query, {async: true});
    }
};

// Dictionary::Pronunciation will call this function.
// It displays the text that tells you how to pronounce a word.
var ddg_spice_dictionary_pronunciation = function(api_result) {
    "use strict";

    if(api_result && api_result.length > 0 && api_result[0].rawType === "ahd-legacy") {
        $("#pronunciation").html(api_result[0].raw);
    }
};

// Dictionary::Audio will call this function.
// It gets the link to an audio file.
var ddg_spice_dictionary_audio = function(api_result) {
    "use strict";

    var playIcon = function(icon) {
        icon.removeClass("icon-pause");
        icon.addClass("icon-play");
    };

    var pauseIcon = function(icon) {
        icon.removeClass("icon-play");
        icon.addClass("icon-pause");
    };

    if(api_result.length > 0) {
        var $icon = $("#play-icon");
        playIcon($icon);
        // Change HTTP to HTTPS.
        var sound = api_result[0].fileUrl.replace(/^http:/, "https:");

        // Set the sound file.
        $("#dictionary-source").attr("src", sound);

        // Start the player.
        $("audio").mediaelementplayer({
            features: ["playpause"],
            success: function(mediaElement) {
                mediaElement.addEventListener("ended", function() {
                    playIcon($icon);
                });
            }
        });

        // The sound file plays when the user clicks on the icon.
        $icon.click(function() {
            // This will prevent the user from playing the audio multiple times. 
            // (This one is a trick that I found in StackOverflow.)
            if($icon.hasClass("icon-play")) {
                pauseIcon($icon);

                var $player = new MediaElementPlayer("#dictionary-player");
                $player.play();
            }
        });
    }
};

var ddg_spice_dictionary_fallback = function(api_result) {
    "use strict";

    if(api_result.length > 0) {
        ddg_spice_dictionary_definition(api_result);
    }
};

function require(path, options) {
    "use strict";

    if(path.match(/\.js$/)) {
        nrj(path, !options.async);
    } else if(path.match(/\.css/)) {
        nrc(path, !options.async);
    } else {
        nrj(path, !options.async);
    }
}
