(function(env) {
    "use strict";

    env.ddg_spice_alternative_to = function(api_result) {
	Spice.add({
	    id: 'alternative_to',
	    name: 'Alternative Software',
	    data: api_result.Items,
	    meta: {
		total: api_result.Items,
		searchTerm: 'something',
		itemType: 'Alternative to',
		sourceUrl: 'http://alternativeto.net/',
		sourceName: 'AlternativeTo'
	    },
	    normalize: function(o) {
		o.Platforms = o.Platforms.join(", ");
		return o;
	    },
	    templates: {
		item: Spice.alternative_to.alternative_to,
		detail: Spice.alternative_to.alternative_to_details
	    }
	});
    };
}(this));
