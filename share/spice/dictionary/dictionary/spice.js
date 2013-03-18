// These libraries will handle the audio file across multiple browsers.
nrc('/forvo/mediaelementplayer.min.css', true);
nrj("/forvo/jquery.min.js", true);
nrj("/forvo/mediaelement-and-player.min.js", true);

// This function will handle the audio pronunciation of the plugin.
function ddg_spice_dictionary_dictionary_audio(sounds) {
    "use strict";
    if(sounds.length > 0) {
        var icon = $("#play-icon");
        // We will only show the icon if there is a file to play.
        icon.addClass('icon-play');
        // Change HTTP to HTTPS.
        var sound = sounds[0].fileUrl.replace(/^http:/, "https:");

        // Set the sound file.
        $("#dictionary-source").attr('src', sound);

        // Start the player.
        $('audio').mediaelementplayer({
            features: ['playpause'],
            success: function(mediaElement, domObject) {
                // This will change the class of the icon once the file stops playing.
                mediaElement.addEventListener('ended', function() {
                    icon.removeClass('icon-pause');
                    icon.addClass('icon-play');
                });
            }
        });

        // The sound file plays when the user clicks on the icon.
        icon.click(function() {
            // This will prevent the user from playing the audio multiple times. 
            // (This one was a trick from StackOverflow.)
            if(icon.hasClass('icon-play')) {
                icon.removeClass('icon-play');
                icon.addClass('icon-pause');

                var player = new MediaElementPlayer("#dictionary-player");
                player.play();
            }
        });
    }
}

// This function will handle the the textual pronunciation.
function ddg_spice_dictionary_dictionary_pronunciation(pronounce) {
    "use strict";
    if(pronounce.length > 0 && pronounce[0].raw && pronounce[0].rawType === "ahd-legacy") {
        var pronunciation = document.getElementById("pronunciation");
        pronunciation.innerHTML = pronounce[0].raw;
    }
}

function ddg_spice_dictionary_dictionary_fallback(words) {
    "use strict";
    
    // Remove the trigger word.
    var query = DDG.get_query().replace(/(^|\s)(define\:?|definition|definition of\:?)($|\s)/, '');
    // Remove spaces.
    query = query.replace(/[ ]+/, '');

    // Skip
    var skip = {
        "define": 1,
        "define:": 1,
        "definition": 1,
        "definition of": 1,
        "definition of:": 1
    };

    if(words.length > 0 && DDG.isRelevant(query, skip)) {
        ddg_spice_dictionary_dictionary(words);
    }
}

function ddg_spice_dictionary_dictionary(words) {
    "use strict";
    if(words.length > 0) {
        var items = [[]];
        items[0] = {
            h: get_header(words),
            a: get_definitions(words),
            u: "http://wordnik.com/words/" + get_word(words),
            s: "Wordnik",
            force_big_header: true,
            force_no_fold: true
        };
        nra(items, 1, 1);
        nrj("/js/spice/dictionary/dictionary_pronunciation/" + get_word(words));
        nrj("/js/spice/dictionary/dictionary_audio/" + get_word(words));
    // Get the results again, but this time with useCanonical set to true (useCanonical is akin to "did you mean?").
    } else {
        // Remove the trigger word.
        var query = DDG.get_query().replace(/(^|\s)(define\:?|definition|definition of\:?)($|\s)/, '');

        // Remove spaces.
        query = query.replace(/[ ]+/, '');

        nrj('/js/spice/dictionary/dictionary_fallback/' + query);
    }

    function get_header(words) {
        return get_word(words) + " (Definition)";
    }

    function get_definitions(words) {
        var list_of_definitions = "";
        for(var i = 0;i < words.length; i += 1) {
            list_of_definitions += "<div>" + shorten_part_of_speech(words[i]) + " " + 
                                   get_definition(words[i]) + "</div>";  
        }

        return "<b>" + get_word(words) + "</b> <span id='pronunciation'></span> <i id='play-icon'></i> <audio id='dictionary-player' preload='none'><source src='' type='audio/mpeg' id='dictionary-source'/></audio>" + list_of_definitions;
    }

    function shorten_part_of_speech(word) {
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
        };
        var result;
        if(part_of_speech[word.partOfSpeech]) {
            result = part_of_speech[word.partOfSpeech];
        } else {
            result = word.partOfSpeech;
        }
        return "<i>" + result + "</i>";
    }

    function get_definition(word) {
        return word.text;
    }

    function get_word(words) {
        return words[0].word;
    } 
}