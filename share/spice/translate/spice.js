function ddg_spice_translate(ir) {
	var items = new Array();
	var ts    = ir.term0.PrincipalTranslations;

	items[0] = new Array();

	items[0]['a'] = ts[0].FirstTranslation.term;
	items[0]['s'] = 'Wordreference.com';
	items[0]['u'] = 'http://wordreference.com/';
	items[0]['f'] = 1;

	nra(items);
}
