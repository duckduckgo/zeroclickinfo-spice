function ddg_spice_rhymes (response) {
    var query = DDG.get_query()
                .replace(/^(what|rhymes?( with| for)?) |\?/gi, "");

    for (var i = 0; i < response.length; i++) {
        word = response.splice(Math.random()*response.length, 1)[0];
        if (word.score == 300)
	        words.push(word.word);
        if (words.length == 30) break;
	}

    if (words.length == 0) return;

    Spice.render({
        data             : words,
        header1          : "(Rhymes)" + query,
        source_url       : 'http://rhymebrain.com/en/What_rhymes_with_'
                            + encodeURIComponent(query),
        source_name      : 'RhymeBrain',
        template_normal  : 'rhymes',
        force_big_header : true
    });
}
