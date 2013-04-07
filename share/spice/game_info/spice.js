function ddg_spice_game_info(ir) {
    var snippet;
    if (ir['status'] == 'OK') {

	var about = ir['about'].substring(0, 249);
        if (ir['about'].length > 250) {
            about += '...';
        }

	items = [[]];
	items[0] = {
            a: about,
            h: ir['name'] + ' (Games)',
            s: ir['domain'],
            u: ir['link'],
            i: ir['image'],
	    force_big_header: 1
        };
        nra(items);

	
    }
}
