function ddg_spice_automeme ( api_result ) {
	
	if (api_result.length) {

		Spice.add({
			data              : {meme : api_result[0]},
			
			sourceName       : "Automeme",
			sourceUrl        : 'http://autome.me/',
			template_normal   : 'automeme',
			template_small    : 'automeme'
		});
	}
}