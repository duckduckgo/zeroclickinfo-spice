// `ddg_spice_urban_dictionary` is a callback function that gets
// "urban dictionary cool" or "urban dictionary ROTFL."

// Note: This plugin can display adult content and profanity.

function ddg_spice_urban_dictionary(res) {
	if (res && res.result_type === "exact" && res.list && res.list[0]) {
		var def = res.list[0];

		var items = [[]];

		items[0] = {
			a: def.definition.replace(/(\r?\n)+/gi, '<br>'),
			h: def.word + ' (Urban Dictionary definition)', // Optimize for vertical space
            force_big_header: true,
			s: 'Urban Dictionary',
			u: 'http://www.urbandictionary.com/define.php?term=' + def.word
		};

		nra(items, 1); // Show the favicon and the "More at" link at the bottom
	}
}
