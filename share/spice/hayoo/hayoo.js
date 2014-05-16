(function(env) {	
	env.ddg_spice_hayoo = function(results) {
	  "use strict";

	  if (!(results && results.hits > 0)) {
	    return;
	  }

	  var query = DDG.get_query().replace(/\s*hayoo\s*/i, '');

	  Spice.add({
	  	id: 'hayoo',
	  	name: 'Software',
	  	data: results.functions[0],
	  	meta: {
	  		itmeType: query + ' (Hayoo!)',
		    sourceUrl: results.functions[0].uri,
		    sourceName: 'Hackage'
		},
		templates: {
		    group: 'base',
		    options: {
			content: Spice.hayoo.detail 
		    }
	        }    
	  });
	}
}(this));

Handlebars.registerHelper("Hayoo_strip_anchor", function(text) {
  "use strict";

  return text.replace(/<\/?(a|code|strong)[^>]*>/g, "");
});
