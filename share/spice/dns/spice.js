function ddg_spice_dns(ir) {
	var snippet = '';
	if (ir['response']['records'].length > 0) {
		snippet = ir['query']['domain'] + ' resolves to ' + ir['response']['records'][0]['data'];
		items = new Array();
		items[0] = new Array();
		items[0]['a'] = snippet;
		items[0]['h'] = '';
		items[0]['s'] = 'ViewDNS.info';
		items[0]['u'] = 'http://www.viewdns.info/dnsrecord/?domain=' + ir['query']['domain'];
		nra(items);
	}
}
