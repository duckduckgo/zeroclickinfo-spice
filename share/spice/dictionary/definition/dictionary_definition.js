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

// Dictionary::Definition will call this function.
// This function gets the definition of a word.
var ddg_spice_dictionary_definition = function(api_result) {
    "use strict";
    var path = "/js/spice/dictionary";

    // We moved Spice.render to a function because we're choosing between two contexts.
    var render = function(context, word, otherWord) {
        Spice.render({
            data              : context,
            header1           : "Definition (Wordnik)",
            force_big_header  : true,
            source_name       : "Wordnik",
            source_url        : "http://www.wordnik.com/words/" + word,
            template_normal   : "dictionary_definition"
        });

        // Do not add hyphenation when we're asking for two words.
        // If we don't have this, we'd can have results such as "black• hole".
        if(!word.match(/\s/)) {
            $.getScript(path + "/hyphenation/" + word);
        }

        // Call the Wordnik API to display the pronunciation text and the audio.
        $.getScript(path + "/pronunciation/" + otherWord);
        $.getScript(path + "/audio/" + otherWord);
    };

    // Expose the render function.
    ddg_spice_dictionary_definition.render = render;

    // Prevent jQuery from appending "_={timestamp}" in our url when we use $.getScript.
    // If cache was set to false, it would be calling /js/spice/dictionary/definition/hello?_=12345
    // and that's something that we don't want.
    $.ajaxSetup({
        cache: true
    });

    // Check if we have results we need.
    if (api_result && api_result.length > 0) {

        // Wait, before we display the plugin, let's check if it's a plural
        // such as the word "cacti."
        var singular = api_result[0].text.match(/^(?:A )?plural (?:form )?of <xref>([^<]+)<\/xref>/i);

        // If the word is plural, then we should load the definition of the word
        // in singular form. The definition of the singular word is usually more helpful.
        if(api_result.length === 1 && singular) {
            ddg_spice_dictionary_definition.pluralOf = api_result[0].word;
            $.getScript(path + "/reference/" + singular[1]);
        } else {
            // Render the plugin if everything is fine.
            render(api_result, api_result[0].word, api_result[0].word);
        }
    }
};

// Dictionary::Reference will call this function.
// This is the part where we load the definition of the
// singular form of the word.
var ddg_spice_dictionary_reference = function(api_result) {
    "use strict";

    var render = ddg_spice_dictionary_definition.render;

    if(api_result && api_result.length > 0) {
        var word = api_result[0].word;

        // We're doing this because we want to say:
        // "Cacti is the plural form of cactus."
        api_result[0].pluralOf = word;
        api_result[0].word = ddg_spice_dictionary_definition.pluralOf;

        // Render the plugin.
        render(api_result, api_result[0].word, word);
    }
};

// Dictionary::Hyphenation will call this function.
// We want to add hyphenation to the word, e.g., hel•lo.
var ddg_spice_dictionary_hyphenation = function(api_result) {
    "use strict";

    var result = [];
    if(api_result && api_result.length > 0) {
        for(var i = 0; i < api_result.length; i += 1) {
            result.push(api_result[i].text);
        }
        // Replace the, rather lame, non-hyphenated version of the word.
        $("#hyphenation").html(result.join("•"));
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

    var isFailed = false;
    var url = "";
    var icon = $("#play-button");

    // Sets the icon to play.
    var playIcon = function() {
        icon.removeClass("widget-button-press");
        icon.addClass("playing");
    };

    // Sets the icon to stop.
    var stopIcon = function() {
        icon.removeClass("playing");
        icon.addClass("widget-button-press");
    };

    // Check if we got anything from Wordnik.
    if(api_result && api_result.length > 0) {
        icon.html("▶");
        icon.removeClass("widget-disappear");

        // Load the icon immediately if we know that the url exists.
        playIcon();

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

    // Load the sound and set the icon.
    var isLoaded = false;
    var loadSound = function() {
        // Set the sound file.
        var sound = soundManager.createSound({
            id: "dictionary-sound",
            url: "/audio/?u=" + url,
            onfinish: function() {
                playIcon();
                soundManager.stopAll();
            },
            ontimeout: function() {
                isFailed = true;
                playIcon();
            },
            whileplaying: function() {
                // We add this just in case onfinish doesn't fire.
                if(this.position === this.durationEstimate) {
                    playIcon();
                    soundManager.stopAll();
                }
            }
        });

        sound.load();
        isLoaded = true;
    };

    // Initialize the soundManager object.
    var soundSetup = function() {
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
            playIcon();
        });
        soundManager.beginDelayedInit();
        soundManager.onready(loadSound);
    };

    // Play the sound when the icon is clicked. Do not let the user play
    // without window.soundManager.
    icon.click(function() {
        if(isFailed) {
            stopIcon();
            setTimeout(playIcon, 1000);
        } else if(icon.hasClass("playing") && isLoaded) {
            stopIcon();
            soundManager.play("dictionary-sound");
        }
    });

    // Check if soundManager was already loaded. If not, we should load it.
    // See http://www.schillmania.com/projects/soundmanager2/demo/template/sm2_defer-example.html
    if(!window.soundManager) {
        window.SM2_DEFER = true;
        $.getScript("/soundmanager2/script/soundmanager2-nodebug-jsmin.js", soundSetup);
    } else {
        isLoaded = true;
    }
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
