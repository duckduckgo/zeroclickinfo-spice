(function (env) {
    "use strict";
    env.ddg_spice_crunchbase_collections = function(api_result){
        // throw error if no result, error result, no items, or array of 0 items
        if (!api_result || api_result.error || !DDG.getProperty(api_result, 'data.items') || api_result.data.items.length === 0) {
            return Spice.failed('crunchbase');
        }

        var data = api_result.data, // get org data
	    items = data.items; // get all orgs

	var metadata = api_result.metadata; // get metadata for base urls
	// get base urls if metdata exists
	if (metadata){
            var wwwPathPrefix = metadata.www_path_prefix,
                imagePathPrefix = metadata.image_path_prefix;
	}

        // Render the response
        Spice.add({
            id: 'crunchbase',
	    name: 'Answer',
            data: items, // crunchbase api v3 returns 10 per page by default
            meta: {
                sourceName: 'Crunchbase',
                sourceUrl: wwwPathPrefix 
            },
            normalize: function(item){
                var properties = DDG.getProperty(item, 'properties');
                // make sure org properties and image url exist before rendering
                if (properties && properties.profile_image_url){
			return { 
			    path:item.path,
			    image:properties.profile_image_url,
			    title: properties.name,
			    url: wwwPathPrefix + properties.web_path,
			    description: properties.short_description
                        };
                }
             },			
             templates: {
                 group: 'info',
                 options: {
                     rating: false
                 }
            }
        });
    };
}(this));
