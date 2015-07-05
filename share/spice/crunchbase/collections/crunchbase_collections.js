(function (env) {
    "use strict";
    env.ddg_spice_crunchbase_collections = function(api_result){
        // throw error if no result, error result, no items, or array of 0 items
        if (!api_result || api_result.error || !DDG.getProperty(api_result, 'data.items') || api_result.data.items.length === 0) {
            return Spice.failed('crunchbase');
        }
        var data = api_result.data, // get org data
	    items = data.items, // get all orgs
	    firstResult = items[0], // get first org to render for now
	    permalink = firstResult.path; // get endpoint of first org

	var metadata = api_result.metadata; // get metadata for base urls
	// get base urls if metdata exists
	if (metadata){
            var wwwPathPrefix = metadata.www_path_prefix,
                imagePathPrefix = metadata.image_path_prefix;
	}

        // get organization information from organization endpoint
	$.getJSON('js/spice/crunchbase/organizations/'+ permalink.split('/')[1],function(response) {
            // return error if no response to organization query
            if (!response) {
                return Spice.failed('crunchbase');
            } else {
                var orgData = DDG.getProperty(response, 'data');
		var description = DDG.getProperty(orgData, 'properties.description');
		// return spice failure if no description to render
		if (!description || description === '' || description === ' '){   
                       return Spice.failed('crunchbase');
                // if there is description add spice
                } else {
                    var spiceMeta = {sourceName: 'Crunchbase'};
		    // check metadata exists before adding it + permalink to source url
		    if (metadata){
                        spiceMeta.sourceUrl = wwwPathPrefix + permalink;
		    }
                    // Render the response
		    Spice.add({
                        id: 'crunchbase',
			name: 'Answer',
			data: orgData,
			meta: spiceMeta,
			normalize: function(item) {
			    var spiceData = { 
				description: DDG.strip_html(description),
				url: wwwPathPrefix + permalink,
				title: item.title
			    };
                            var imageArray = DDG.getProperty(item, 'relationships.primary_image.items');
			    // add primary image if both path components exist
			    if (imagePathPrefix && imageArray.length > 0) {
			       spiceData.image = imagePathPrefix + imageArray[0].path;
			    }
			    // return spice data
			    return spiceData; 
			},
			templates: {
			    group: 'info'
			}
		    });
                }
            }
        });
    };
}(this));
