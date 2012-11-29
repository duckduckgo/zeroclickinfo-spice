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

var translations = [];

function ddg_spice_translate_detect(ir) {
	params = get_params();
	words  = params[0];

	from   = ir.data.detections[0].language;
	to     = params[1];

	script = '';
	callbk = undefined;

	if (words.split('%20').length > 1) {
		base = '/js/spice/translate/my_memory/';

		nrj(base + from + '/' + to + '/' + words);
	} else {
		base = '/js/spice/translate/wordreference/';

		nrj(base + from + to + '/' + words);
	}
}

function get_params() {
	scripts = document.getElementsByTagName('script');

	for (i = 0; i < scripts.length; i++) {
		regex = /translate\/([a-z]+)\/(.+)\/(.+)/;
		match = scripts[i].src.match(regex);

		if (match != undefined) {
			return [match[2], match[3]];
		}
	}

	return ['', ''];
}

/* MyMemory */
function ddg_spice_translate_my_memory(ir) {
	items = new Array();

	params = get_params_my_memory();
	dict   = params[0];
	word   = unescape(params[1]);
	from   = dict.slice(0, 2);
	to     = dict.slice(-2);

	if ((word == '') || (dict == ''))
		return;

	items[0] = new Array();
	items[0]["h"] = langs[to] + ' translations for <i>' + word + '</i>';
	items[0]['s'] = 'MyMemory';
	items[0]['u'] = 'http://mymemory.translated.net/s.php?q='
		+ word + '&sl=' + from + '&tl=' + to;
	items[0]["force_big_header"] = true;

	text = '<ul>';

	text += format_translations_my_memory(ir.matches);

	text += '</ul>';

	items[0]['a'] = text;

	nra(items);
}

function get_params_my_memory() {
	scripts = document.getElementsByTagName('script');

	for (i = 0; i < scripts.length; i++) {
		regex = /translate\/my_memory\/(.+)\/(.+)/;
		match = scripts[i].src.match(regex);

		if (match != undefined) {
			return [match[1], match[2]];
		}
	}

	return ['', ''];
}

function format_translations_my_memory(ts) {
	text = '';

	for (i in ts) {
		origi = ts[i].segment;
		first = ts[i].translation;

		if (origi != first)
			text += format_translation_my_memory(first);
	}

	return text;
}


function format_translation_my_memory(t) {
	if (t == undefined)
		return '';

	if (translations.indexOf(t) != -1)
		return '';
	else
		translations.push(t);

	text = '<li><i>' + t + '</i>';

	text += '</li>';

	return text;
}

/* Wordreference */
function ddg_spice_translate_wordreference(ir) {
	items = new Array();

	params = get_params_wordreference();
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

	text += format_term_wordreference(ir.term0);

	if (ir.term1 != undefined)
		text += format_term_wordreference(ir.term1);

	text += '</ul>';

	items[0]['a'] = text;

	nra(items);
}

function get_params_wordreference() {
	scripts = document.getElementsByTagName('script');

	for (i = 0; i < scripts.length; i++) {
		regex = /translate\/wordreference\/(.+)\/(.+)/;
		match = scripts[i].src.match(regex);

		if (match != undefined) {
			return [match[1], match[2]];
		}
	}

	return ['', ''];
}

function format_term_wordreference(term) {
	text = format_translations_wordreference(term.PrincipalTranslations);

	if (term.AdditionalTranslations)
		text += format_translations_wordreference(term.AdditionalTranslations);

	return text;
}

function format_translations_wordreference(ts) {
	text = '';

	for (i in ts) {
		origi = ts[i].OriginalTerm;
		first = ts[i].FirstTranslation;
		secnd = ts[i].SecondTranslation;

		if (origi.term != first.term)
			text += format_translation_wordreference(first);

		if ((secnd != undefined) && (origi.term != secnd.term))
			text += format_translation_wordreference(secnd);
	}

	return text;
}

function format_translation_wordreference(t) {
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
