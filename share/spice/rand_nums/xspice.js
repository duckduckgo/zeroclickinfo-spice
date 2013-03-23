function ddg_spice_rand_nums(response) {

	var query  = DDG.get_query();
	var regexp = /^(rand|random) (numbers|nums)(?: (\-?[0-9]+)\-(\-?[0-9]+)|)$/i;
	var match  = query.match(regexp);
	var min    = match[3];
	var max    = match[4];

	if (min == undefined) min = 0;
	if (max == undefined) max = 100;

    Spice.render({
        data             : { 'numbers' : response },
        source_url       : 'http://www.random.org/integers/?num=100&min='
                            + min + '&max=' + max + '&col=5&base=10&format=html&rnd=new',
        source_name      : 'Random.org',
        template_normal  : 'rand_nums',
    });
}
