function ddg_spice_translate_basic(ir) {
	params = get_params();
	dict   = params[0];
	words  = params[1];

	from   = dict.slice(0, 2);
	to     = dict.slice(-2);

	script = '';
	callbk = undefined;

	if (words.split('%20').length > 1) {
		script = '/share/spice/translate/my_memory/spice.js';

		callbk = function () {
			base = '/js/spice/translate/my_memory/';
			nrj(base + from + '|' + to + '/' + words);
		};
	} else {
		script = '/share/spice/translate/wordreference/spice.js';

		callbk = function () {
			base = '/js/spice/translate/wordreference/';
			nrj(base + dict + '/' + words);
		};
	}

	load_script(script, callbk);
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

function load_script(url, callback) {
	head = document.getElementsByTagName('head')[0];
	script = document.createElement('script');

	script.type = 'text/javascript';
	script.src = url;

	script.onreadystatechange = callback;
	script.onload = callback;

	head.appendChild(script);
}
