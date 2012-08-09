function ddg_spice_meta_cpan(ir) {
	items = new Array();

	if (ir["message"])
		return;

	query = DDG.get_query().replace(/\s*(metacpan|meta cpan|cpan)\s*/i, '');
	name  = ir["documentation"];
	desc  = ir["description"];

	head = 'MetaCPAN (' + query + ')';

	items[0] = new Array();
	items[0]['h'] = head;
	items[0]['s'] = 'MetaCPAN';
	items[0]['u'] = 'http://metacpan.org/module/' + name;
	items[0]["force_big_header"] = true;

	text = '<pre>Module: ' + name + '</pre>';

	if (desc) {
		short_desc = '';
		max_len = 260;

		if (desc.length > max_len)
			short_desc = desc.substring(0, max_len) + '...';
		else
			short_desc = desc;

		text += '<p>' + short_desc + '<p>';
	}

	items[0]['a'] = text;

	nra(items);
}
