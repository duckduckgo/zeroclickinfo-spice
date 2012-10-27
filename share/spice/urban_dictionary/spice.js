function ddg_spice_urban_dictionary(res) 
{
	if (res.result_type == "exact" && res.list[0]) {
		var def = res.list[0];

		items = new Array();
		items[0] = new Array();

		items[0]['a'] = def.definition.split("\n")[0];
		// items[0]['h'] = def.word + ' (Urban Dictionary definition)'; // Optimize for vertical space
		items[0]['s'] = 'Urban Dictionary';

		// Unsure if we should link to the specific definition
		// I prefer the general definitions page
		// items[0]['u'] = def.permalink; 
		items[0]['u'] = 'http://www.urbandictionary.com/define.php?term=' + def.word; 

		nra(items, 1); // Show the favicon and the "More at" link at the bottom
	}
}