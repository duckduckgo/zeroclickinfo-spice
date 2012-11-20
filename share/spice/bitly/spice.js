function ddg_spice_bitly (r) {
	if (r['status_code'] == 200) {
		url = r['data']['url'];
		items = new Array();
		items[0] = new Array();
		items[0]['a'] = '<span>Here is a shortened version of that URL: <a href="' + url + '" target="_blank">' + url + '</a></span><br />';
		items[0]['h'] = 'Shortened URL (bitly)';
		items[0]['i'] = 'http://i.imgur.com/SPtMJ.png';
		items[0]['s'] = 'Bitly';
		items[0]['u'] = 'http://bitly.com';
		items[0]['force_big_header'] = true;
		nra(items);
	}
}
