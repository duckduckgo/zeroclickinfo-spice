(function(env) {
    "use strict";

    function get_platform(Platforms) {
	if(Platforms.length > 1) {
	    return "Multiplatform";
	}
	return Platforms[0];
    }
    
    env.ddg_spice_alternative_to = function(api_result) {
	Spice.add({
	    id: 'alternative_to',
	    name: 'Alternative Software',
	    data: api_result.Items,
	    meta: {
		searchTerm: api_result.Name,
		itemType: 'Alternatives ',
		sourceUrl: 'http://alternativeto.net/',
		sourceName: 'AlternativeTo',
		sourceIcon: true
	    },
	    normalize: function(o) {
		return { 
		    title: o.Name,
		    Platforms: get_platform(o.Platforms)
		};
	    },
	    templates: {
		item: Spice.alternative_to.item,
	    }
	});
    };
}(this));
