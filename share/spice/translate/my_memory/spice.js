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

	text += format_translations(ir.matches);

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

function format_translations(ts) {
	text = '';

	for (i in ts) {
		origi = ts[i].segment;
		first = ts[i].translation;

		if (origi != first)
			text += format_translation(first);
	}

	return text;
}

var translations = [];

function format_translation(t) {
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
