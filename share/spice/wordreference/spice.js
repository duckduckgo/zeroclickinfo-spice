function ddg_spice_wordreference(ir) {
	items = new Array();

	params = get_params();
	dict   = params[0];
	word   = params[1];

	if ((word == '') || (dict == ''))
		return;

	items[0] = new Array();
	items[0]["h"] = 'Translations for <i>' + word + '</i>';
	items[0]['s'] = 'Wordreference.com';
	items[0]['u'] = 'http://wordreference.com/' + dict + '/' + word;
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

	text = '<li><i>' + t.term + '</i>';

	if (t.POS)
		text += ' (' + t.POS + ')';

	text += '</li>';

	return text;
}

function get_params() {
	scripts = document.getElementsByTagName('script');

	for (i = 0; i < scripts.length; i++) {
		regex = /wordreference\/([a-z]+)\/([a-z]+)/;
		match = scripts[i].src.match(regex);

		if (match != undefined)
			return [match[1], match[2]];
	}

	return ['', ''];
}
