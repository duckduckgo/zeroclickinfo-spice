(function(env) {
    env.ddg_spice_brainy_quote = function(api_result) {
	if(api_result.error) {
	    return;
	}

	Spice.add({
	    id: 'brainy_quote',
	    name: 'Quote',
	    data: api_result,
	    meta: {
		sourceName: 'Brainy Quote',
		sourceUrl: api_result.source_url,
	    },
	    template_group: 'info',
	    templates: {
		options: {
		    content: Spice.brainy_quote.content 
		}
	    }
	});
    };
}(this));
