function ddg_spice_rhymes ( api_result ) {
	var query = DDG.get_query()
				.replace(/^(what|rhymes?( with| for)?) |\?/gi, "");

	if ( !api_result.length ) return;

	Spice.render({
		data             : api_result,
		header1          : query + " (Rhymes)",
		source_url       : 'http://rhymebrain.com/en/What_rhymes_with_' +
							encodeURIComponent(query),
		source_name      : 'RhymeBrain',
		template_normal  : 'rhymes',
		force_big_header : true
	});
}

// Randomly selects rhyming words from the
// list returned by the RhymeBrain API
Handlebars.registerHelper('selectRhymes', function(options) {
	var words = [];

	for (var i = 0; i < this.length; i++) {
		var word = this.splice( Math.random() * this.length, 1)[0];

		if (word.score == 300)
			words.push(word);
		if (words.length == 30) break;
	}

	return options.fn(words);
});