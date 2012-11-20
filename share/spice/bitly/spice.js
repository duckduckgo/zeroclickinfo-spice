function ddg_spice_bitly (r) {
	if (r['status_code'] == 200) {
		url = r['data']['url'];
		items = new Array();
		items[0] = new Array();
		items[0]['a'] = '<p><span>Shortened URL: <a href="' + url + '" target="_blank">' + url + '</a></span></p>';
		items[0]['h'] = 'Shortened URL (bitly)';
		items[0]['s'] = 'Bitly';
		items[0]['u'] = 'http://bitly.com';
		nra(items);
	}
}
