(function(env) {
    "use strict";

    var script = $('[src*="/js/spice/alternative_to/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/alternative_to\/([^\/]*)/)[1];

    env.ddg_spice_alternative_to = function(api_result) {
	Spice.add({
	    id: 'alternative_to',
	    name: 'Alternative Software',
	    data: api_result.Items,
	    meta: {
		total: api_result.Items,
		searchTerm: decodeURIComponent(query),
		itemType: 'Alternatives ',
		sourceUrl: 'http://alternativeto.net/',
		sourceName: 'AlternativeTo',
		sourceIcon: true
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
