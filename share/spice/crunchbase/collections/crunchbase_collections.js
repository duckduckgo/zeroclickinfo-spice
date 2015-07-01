(function (env) {
    "use strict";
    env.ddg_spice_crunchbase_collections = function(api_result){
	console.log(api_result);
        // Validate the response
        if (!api_result || api_result.error || api_result.data.items.length === 0) {
            return Spice.failed('crunchbase');
        }

        var metadata = api_result.metadata, // get metadata for base urls
            data = api_result.data, // get org data
            items = data.items, // get all orgs
            wwwPathPrefix = metadata.www_path_prefix,
            imagePathPrefix = metadata.image_path_prefix,
            firstResult = api_result.data.items[0], // get first org to render for now
            permalink = firstResult.path; // get endpoint of first org

        // get organization information from organization endpoint
	$.getJSON('js/spice/crunchbase/organizations/'+ permalink.split('/')[1],function(response) {
            // Render the response
            Spice.add({
                id: "crunchbase",
		name: "Crunchbase Organization",
		data: response.data,
		meta: {
                    sourceName: "Crunchbase",
                    sourceUrl: api_result.metadata.www_path_prefix + permalink
                },
                normalize: function(item) {
                    return  { 
                        description: DDG.strip_html(item.properties.description),
                        url: wwwPathPrefix + permalink,
                        image: imagePathPrefix + item.relationships.primary_image.items[0].path,
                        title: item.title
		    };
		},
		templates: {
                    group: 'info'
                }
            });
        });
    };
}(this));
