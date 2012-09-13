function ddg_spice_translate_basic(ir) {
	params = get_params();
	dict   = params[0];
	words  = params[1];

	script = '';
	callbk = undefined;

	if (words.split('%20').length > 1) {
		console.log("MyMemory");
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
		regex = /translate\/([a-z]+)\/([a-z]+)\/(.+)/;
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
