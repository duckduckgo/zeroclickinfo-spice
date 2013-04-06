function ddg_spice_game_info(ir) {
    var snippet;
    if (ir['status'] == 'OK') {

	var about = ir['about'].substring(0, 199);
        if (ir['about'].length > 200) {
            about += '...';
        }

	items = [[]];
	items[0] = {
            a: about,
            h: ir['name'],
            s: 'thefreegamesdb',
            u: ir['link'],
            i: ir['image']
        };
        nra(items);

	
    }
}
