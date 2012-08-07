function ddg_spice_meta_cpan(ir) {
	items = new Array();

	if (ir["message"])
		return;

	name = ir["documentation"];
	desc = ir["description"];

	head = 'MetaCPAN (' + name + ')';

	items[0] = new Array();
	items[0]['h'] = head;
	items[0]['s'] = 'MetaCPAN';
	items[0]['u'] = 'http://metacpan.org/module/' + name;
	items[0]["force_big_header"] = true;

	text = '';

	if (desc) {
		short_desc = '';
		max_len = 340;

		if (desc.length > max_len)
			short_desc = desc.substring(0, max_len) + '...';
		else
			short_desc = desc;

		text += short_desc + "<br>";
	}

	items[0]['a'] = text;

	nra(items);
}