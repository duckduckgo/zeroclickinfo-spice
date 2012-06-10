function ddg_spice_rhymes(response) {
    var query = decodeURIComponent(rq);
    query = query.replace(/^(what|rhymes( with| for)?)| |\?/gi, "")
    var words = new Array();
	for (var i = 0; i < response.length; i++) {
        word = response.splice(Math.random()*response.length, 1)[0];
        if (word.score == 300)
	        words.push(word.word);
        if (words.length == 30) break;
	}
    if (words.length == 0) return;

	var items = new Array();
	items[0] = new Array();
    items[0]['a'] = words.join(', ') + ".";
	items[0]['h'] = "Rhymes with " + query;
	items[0]['s'] = 'RhymeBrain';
	items[0]['u'] = 'http://rhymebrain.com/';
    items[0]["force_big_header"] = true;
    items[0]["force_space_after"] = true;
	
	nra(items);
}
