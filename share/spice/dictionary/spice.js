nrc('/forvo/mediaelementplayer.min.css', true);
nrj("/forvo/jquery.min.js", true);
nrj("/forvo/mediaelement-and-player.min.js", true);
//nrj("/forvo/dictionary.js", true);

function ddg_spice_dictionary_audio(sounds) {
	if(sounds.length > 0) {
		var icon = $("#play-icon");
		icon.addClass('icon-play');
		var sound = sounds[0].fileUrl.replace(/^http/, "https");

		// Get source tag.
		$("#dictionary-source").attr('src', sound);

		// Set the audio tags.
		$('audio').mediaelementplayer({
			features: ['playpause'],
			success: function(mediaElement, domObject) {
				mediaElement.addEventListener('ended', function() {
					icon.removeClass('icon-pause');
					icon.addClass('icon-play');
				});
			}
		});

		icon.click(function() {
			if(icon.hasClass('icon-play')) {
				icon.removeClass('icon-play');
				icon.addClass('icon-pause');

				var player = new MediaElementPlayer("#dictionary-player");
				player.play();		
			}
		});
	}
}

function ddg_spice_dictionary_pronunciation(pronounce) {
	if(pronounce.length > 0 && pronounce[0].raw && pronounce[0].rawType === "ahd-legacy") {
		var pronunciation = document.getElementById("pronunciation");
		pronunciation.innerHTML = pronounce[0].raw;
	}
}

function ddg_spice_dictionary(words) {
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
		nrj("/js/spice/dictionary_pronunciation/" + get_word(words));
		nrj("/js/spice/dictionary_audio/" + get_word(words));
	}

	function get_header(words) {
		return "Definitions";
	}

	function get_definitions(words) {
		var list_of_definitions = "";
		for(var i = 0;i < words.length; i += 1) {
			list_of_definitions += "<div>" + shorten_part_of_speech(words[i]) + " " + 
								   get_definition(words[i]) + "</div>";  
		}

		return "<b>" + get_word(words) + "</b> <span id='pronunciation'></span> <i id='play-icon'></i> <audio id='dictionary-player'><source src='' type='audio/mpeg' id='dictionary-source'/></audio>" + list_of_definitions;
	}

	function shorten_part_of_speech(word) {
		var part_of_speech = {
			"interjection": "interj.",
			"noun": "n.",
			"verb-intransitive": "v.",
			"verb-transitive": "v.",
			"adjective": "adj.",
			"adverb": "adv.",
			"verb": "v."
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