(function(env) {
    "use strict";

    var script = $('[src*="/js/spice/alternative_to/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/alternative_to\/([^\/]*)/)[1];

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
		searchTerm: decodeURIComponent(query),
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
		item: Spice.alternative_to.alternative_to,
	    }
	});
    };
}(this));
