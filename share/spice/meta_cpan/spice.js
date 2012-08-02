function ddg_spice_meta_cpan(ir) {
	items = new Array();
	items[0] = new Array();

	items[0]['s'] = 'MetaCPAN';
	items[0]['h'] = '';

	if (ir["message"])
		return;

	text = ir["documentation"];
	abst = ir["abstract"];

	if (ir["abstract"]) {
		text += ' - ' + ir["abstract"];
	}

	items[0]['a'] = text;
	items[0]['u'] = 'http://metacpan.org/module/' + ir["documentation"];

	nra(items);
}
