function ddg_spice_rhymes(response) {
    var query = decodeURIComponent(rq);
    query = query.replace(/^(what|rhymes?( with| for)?) |\?/gi, "")
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
    items[0]['a'] = "Rhymes: " + words.join(', ') + ".";
	items[0]['h'] = query + " (Rhymes)";
	items[0]['s'] = 'RhymeBrain';
	items[0]['u'] = 'http://rhymebrain.com/en/What_rhymes_with_'
                  + encodeURI(query) + '.html';
    items[0]["force_big_header"] = true;
	
	nra(items);
}
