// The dictionary plug-in requires multiple API calls, and these are handled by:
// ddg_spice_dictionary_definition - gets the definitions of a given word (e.g. noun. A sound or a combination of sounds).
// ddg_spice_dictionary_pronunciation - gets the pronunciation of a word (e.g. wûrd). 
// ddg_spice_dictionary_audio - gets the audio file of a word.
// ddg_spice_dictionary_fallback - handles any misspellings.
//
// pronunciation and audio callbacks are loaded and executed much later -- that is, 
// after ddg_spice_dictionary_definition gets executed.

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
        "undefined": "",
        "auxiliary-verb": "v."
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
            data              : context,
            force_big_header  : true,
            header1           : context.word + " (Definition)",
            source_name       : "Wordnik",
            source_url        : "http://www.wordnik.com/words/" + context.word,
            template_normal   : "dictionary",
            template_small    : "dictionary"
        });

        // Call the Wordnik API to display the pronunciation text and the audio.
        $(document).ready(function() {
            DDG.require("/js/spice/dictionary/pronunciation/" + context.word);
            DDG.require("/js/spice/dictionary/audio/" + context.word);
        })

    // If we did not get any results, we should try calling the definition API again,
    // but this time with useCanonical=true. This works for words such as "brobdingnagian"
    // which gets corrected to "Brobdingnagian."
    } else {
        var query = DDG.get_query().replace(/^(definition of\:?|define\:?|definition)|(define|definition)$/, "");
        // Remove extra spaces.
        query = query.replace(/(^\s+|\s+$)/g, "");
        DDG.require("/js/spice/dictionary/fallback/" + query);
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

    var url = "";
    var $icon = $("#play-icon");

    var playIcon = function() {
        $icon.removeClass("icon-stop");
        $icon.addClass("icon-play");
    };

    var stopIcon = function() {
        $icon.removeClass("icon-play");
        $icon.addClass("icon-stop");
    };

    if(api_result && api_result.length > 0) {
        // Find the audio url that was created by Macmillan (it usually sounds better).
        for(var i = 0; i < api_result.length; i += 1) {
            if(api_result[i].createdBy === "macmillan" && url === "") {
                url = api_result[i].fileUrl;
            }
        }

        // If we don't find Macmillan, we use the first one.
        if(url === "") {
            url = api_result[0].fileUrl;
        }
    } else {
        return;
    }

    $icon.click(function() {
        if($icon.hasClass("icon-play") && window.soundManager) {
            stopIcon();
            soundManager.play("dictionary-sound");
        }
    });

    var loadSound = function() {
        // Set the sound file.
        var sound = soundManager.createSound({
            id: "dictionary-sound",
            url: "/audio/?u=" + url,
            onfinish: function() {
                playIcon();
            }
        });

        // Preload the sound file immediately because the link expires.
        sound.load();

        // Set the icon.
        playIcon();
    };

    var soundSetup = function() {
        window.soundManager = new SoundManager();
        soundManager.url = "/soundmanager2/swf/";
        soundManager.flashVersion = 9;
        soundManager.useFlashBlock = false;
        soundManager.useHTML5Audio = false;
        soundManager.beginDelayedInit();
        soundManager.onready(loadSound);
    };

    // Check if soundManager was already loaded.
    // See http://www.schillmania.com/projects/soundmanager2/demo/template/sm2_defer-example.html
    if(window.soundManager == null) {
        window.SM2_DEFER = true;
        DDG.require("/soundmanager2/script/soundmanager2-nodebug-jsmin.js", {
            success: soundSetup
        });
    }
};

var ddg_spice_dictionary_fallback = function(api_result) {
    "use strict";

    if(api_result && api_result.length > 0) {
        ddg_spice_dictionary_definition(api_result);
    }
};