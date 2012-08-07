function ddg_spice_wordreference(ir) {
	items = new Array();

	query  = DDG.get_query();
	regexp = /^translate ([a-z]+) from ([a-z]+) to ([a-z]+)$/;
	match  = query.match(regexp);
	word   = match[1];
	from   = match[2];
	to     = match[3];

	items[0] = new Array();
	items[0]["h"] = 'Translations for <i>' + word + '</i>';
	items[0]['s'] = 'Wordreference.com';
	items[0]['u'] = 'http://wordreference.com/' + from + to + '/' + word;
	items[0]["force_big_header"] = true;

	if (ir["Error"])
		return;

	text = '<ul>';

	text += format_translations(ir.term0.PrincipalTranslations);

	if (ir.term0.AdditionalTranslations)
		text += format_translations(ir.term0.AdditionalTranslations);

	text += '</ul>';

	items[0]['a'] = text;

	nra(items);
}

function format_translations(ts) {
	text = '';

	for (i in ts) {
		text += format_translation(ts[i].FirstTranslation);

		if (ts[i].SecondTranslation != undefined)
			text += format_translation( ts[i].SecondTranslation);
	}

	return text;
}

function format_translation(t) {
	if (t == undefined)
		return '';

	text = '<li><i>' + t.term + '</i> (' + t.POS + ')</li>';

	return text;
}
