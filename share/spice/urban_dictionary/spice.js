function ddg_spice_urban_dictionary(res) 
{
	if (res && res.result_type === "exact" && res.list && res.list[0]) {
		var def = res.list[0];

		var items = [[]];

		items[0] = {
			a: def.definition.replace(/(\r?\n)+/gi, '<br>'),
			//h: def.word + ' (Urban Dictionary definition)', // Optimize for vertical space
			s: 'Urban Dictionary',
			u: 'http://www.urbandictionary.com/define.php?term=' + def.word
			//u: def.permalink // Alternatively, link to the specific shown definition
		};

		nra(items, 1); // Show the favicon and the "More at" link at the bottom
	}
}
