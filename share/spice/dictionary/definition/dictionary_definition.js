// Description:
// Shows the definition of a word.
//
// Dependencies:
// Requires SoundManager2 and jQuery.
//
// Commands:
// define dictionary - gives the definition of the word "dictionary."
//
// Notes:
// ddg_spice_dictionary_definition - gets the definitions of a given word (e.g. noun. A sound or a combination of sounds).
// ddg_spice_dictionary_pronunciation - gets the pronunciation of a word (e.g. wûrd).
// ddg_spice_dictionary_audio - gets the audio file.
// ddg_spice_dictionary_reference - handles plural words. (Improve on this in the future.)

// This function gets the definition of a word.
var ddg_spice_dictionary_definition = function(api_result) {
    "use strict";
    var path = "/js/spice/dictionary";

    // We moved Spice.render to a function because we're choosing between two contexts.
    var render = function(context, word, pluralOf) {
        Spice.render({
            data              : context,
            header1           : "Definition (Wordnik)",
            force_big_header  : true,
            source_name       : "Wordnik",
            source_url        : "http://www.wordnik.com/words/" + word,
            template_normal   : "dictionary_definition"
        });

        if(!word.match(/\s/)) {
            $.getScript(path + "/hyphenation/" + word);
        }
        // Call the Wordnik API to display the pronunciation text and the audio.
        $.getScript(path + "/pronunciation/" + pluralOf);
        $.getScript(path + "/audio/" + pluralOf);
    };

    // Expose the render function.
    ddg_spice_dictionary_definition.render = render;

    // Prevent jQuery from appending "_={timestamp}" in our url.
    $.ajaxSetup({
        cache: true
    });

    // Check how many items we have, and if it refers to something that's plural (we know this because of the regexp).
    if (api_result && api_result.length > 0) {
        var plural = api_result[0].text.match(/^(?:A )?plural (?:form )?of <xref>([^<]+)<\/xref>/i);

        // This loads the definition of the singular form of the word.
        if(api_result.length === 1 && plural) {
            $.getScript(path + "/reference/" + plural[1]);
            ddg_spice_dictionary_definition.pluralOf = api_result[0].word;
        } else {
            render(api_result, api_result[0].word, api_result[0].word);
        }
    }
};

// Change the context so that it would say something like, "dictionaries is the plural of dictionary."
var ddg_spice_dictionary_reference = function(api_result) {
    "use strict";

    var render = ddg_spice_dictionary_definition.render;

    if(api_result && api_result.length > 0) {
        var word = api_result[0].word;
        api_result[0].pluralOf = "is the plural form of " + word;
        api_result[0].word = ddg_spice_dictionary_definition.pluralOf;
        render(api_result, api_result[0].word, word);
    }
};

var ddg_spice_dictionary_hyphenation = function(api_result) {
    "use strict";

    var result = [];
    if(api_result && api_result.length > 0) {
        for(var i = 0; i < api_result.length; i += 1) {
            result.push(api_result[i].text);
        }
        $("#hyphenation").html(result.join("•"));
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

// Do not encode the HTML tags, and make sure we replace xref to an anchor tag.
Handlebars.registerHelper("format", function(text) {
    "use strict";

    // Replace the xref tag into an anchor tag.
    text = text.replace(/<xref>([^<]+)<\/xref>/g, "<a class='reference' href='https://www.wordnik.com/words/$1'>$1</a>");

    // Make sure we do not encode the HTML tags.
    return text;
});

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
    var icon = $("#play-icon");

    // Sets the icon to play.
    var playIcon = function() {
        icon.removeClass();
        icon.addClass("icon-volume-up");
    };

    // Sets the icon to stop.
    var stopIcon = function() {
        icon.removeClass();
        icon.addClass("icon-stop");
    };

    if(api_result && api_result.length > 0) {
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
            },
            ontimeout: function() {
                isFailed = true;
                playIcon();
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
        } else if(icon.hasClass("icon-volume-up") && isLoaded) {
            stopIcon();
            soundManager.play("dictionary-sound");
        }
    });

    // Check if soundManager was already loaded. If not, we should load it.
    // See http://www.schillmania.com/projects/soundmanager2/demo/template/sm2_defer-example.html
    window.SM2_DEFER = true;
    $.getScript("/soundmanager2/script/soundmanager2-nodebug-jsmin.js", soundSetup);
};