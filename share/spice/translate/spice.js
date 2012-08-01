function ddg_spice_translate(ir) {
	var items = new Array();

	items[0] = new Array();
	items[0]['s'] = 'Wordreference.com';
	items[0]['u'] = 'http://wordreference.com/';

	if (ir["Error"]) {
		items[0]['a'] = ir["Note"];
	} else {
		var ts = ir.term0.PrincipalTranslations;

		items[0]['a'] = ts[0].FirstTranslation.term;
	}

	nra(items);
}
