function ddg_spice_translate(ir) {
	items = new Array();

	query  = DDG.get_query();
	regexp = /^translate ([a-z]+) from ([a-z]+) to ([a-z]+)$/;
	match  = query.match(regexp);
	word   = match[1];
	from   = match[2];
	to     = match[3];

	items[0] = new Array();
	/* items[0]["h"] = 'lol'; */
	items[0]['s'] = 'Wordreference.com';
	items[0]['u'] = 'http://wordreference.com/' + from + to + '/' + word;

	if (ir["Error"])
		return;

	ts = ir.term0.PrincipalTranslations;

	text = ts[0].FirstTranslation.term;

	if (ts[0].SecondTranslation != undefined)
		text += ' (' + ts[0].SecondTranslation.term + ')';

	items[0]['a'] = text;

	nra(items);
}
