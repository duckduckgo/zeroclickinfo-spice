var langs = {
	'ar': 'Arabic',
	'zh': 'Chinese',
	'cz': 'Czech',
	'en': 'English',
	'fr': 'French',
	'gr': 'Greek',
	'it': 'Italian',
	'ja': 'Japanese',
	'ko': 'Korean',
	'pl': 'Polish',
	'pt': 'Portuguese',
	'ro': 'Romanian',
	'es': 'Spanish',
	'tr': 'Turkish'
};

function ddg_spice_wordreference_translate(ir) {
	items = new Array();

	params = get_params();
	dict   = params[0];
	word   = params[1];
	to     = dict.slice(-2);

	if ((word == '') || (dict == ''))
		return;

	items[0] = new Array();
	items[0]["h"] = langs[to] + ' translations for <i>' + word + '</i>';
	items[0]['s'] = 'Wordreference.com';
	items[0]['u'] = 'http://wordreference.com/' + dict + '/' + word;
	items[0]["force_big_header"] = true;

	if (ir["Error"])
		return;

	text = '<ul>';

	text += format_term(ir.term0);

	if (ir.term1 != undefined)
		text += format_term(ir.term1);

	text += '</ul>';

	items[0]['a'] = text;

	nra(items);
}

function format_term(term) {
	text = format_translations(term.PrincipalTranslations);

	if (term.AdditionalTranslations)
		text += format_translations(term.AdditionalTranslations);

	return text;
}

function format_translations(ts) {
	text = '';

	for (i in ts) {
		origi = ts[i].OriginalTerm;
		first = ts[i].FirstTranslation;
		secnd = ts[i].SecondTranslation;

		if (origi.term != first.term)
			text += format_translation(first);

		if ((secnd != undefined) && (origi.term != secnd.term))
			text += format_translation(secnd);
	}

	return text;
}

var translations = [];

function format_translation(t) {
	if (t == undefined)
		return '';

	if (translations.indexOf(t.term) != -1)
		return '';
	else
		translations.push(t.term);

	text = '<li><i>' + t.term + '</i>';

	text += '</li>';

	return text;
}

function get_params() {
	scripts = document.getElementsByTagName('script');

	for (i = 0; i < scripts.length; i++) {
		regex = /wordreference\/([a-z]+)\/([a-z]+)\/([a-z]+)/;
		match = scripts[i].src.match(regex);

		if (match != undefined) {
			return [match[2], match[3]];
		}
	}

	return ['', ''];
}
