function ddg_spice_rand_nums(ir) {
	items = new Array();
	items[0] = new Array();

	query  = DDG.get_query();
	regexp = /^random (numbers|nums)(?: ([0-9]+)\-([0-9]+)|)$/i;
	match  = query.match(regexp);
	min    = match[2];
	max    = match[3];

	if (min == undefined)
		min = 0;

	if (max == undefined)
		max = 100;

	items[0]['a'] = ir;
	items[0]['h'] = '';
	items[0]['s'] = 'Random.org';
	items[0]['u'] = 'http://www.random.org/integers/?num=100&min=' + min + '&max=' + max + '&col=5&base=10&format=html&rnd=new';

	nra(items);
}
