function nrio(ir) {
    var snippet = '';
    if (ir && ir.answer) {
		snippet = '<b>' + ir.answer.replace(/[ ]+/, ' ') + '</b>';
		if (ir.forecast) {
			snippet += '; ' + ir.forecast.replace(/[ ]+/, ' ');
		}
		if (ir.location) {
			snippet += ' (' + ir.location.replace(/[ ]+/, ' ') + ')';
		}
		var items = [[]];
		items[0] = {
			a: snippet,
			h: 'Is it snowing yet?',
			s: 'IsItSnowingYet',
			u: 'http://isitsnowingyet.org/check?q=' + ir.location.replace(/[ ]+/, ' '),
			force_big_header: true
		};
		nra(items, 4, 1);
    }
}

