(function (env) {
    "use strict";
    env.ddg_spice_crunchbase_collections = function(api_result){
        // throw error if no result, error result, no items, or array of 0 items
        if (!api_result || api_result.error || !DDG.getProperty(api_result, 'data.items') || api_result.data.items.length === 0) {
            return Spice.failed('crunchbase');
        }

        // return items with query in name
        function filterVerbatim(item){
            return item.properties.name.toLowerCase().indexOf(query) !== -1;
        }
        var data = api_result.data, // get org data
	    items = data.items; // get all orgs
        
        var reCompany = /crunchbase (.*)/; // all words proceeding crunchbase
        var query = DDG.get_query().match(reCompany)[1]; // get org query
        var verbatimMatches = items.filter(filterVerbatim); // filter by query
        
        if (verbatimMatches){ // if matches by query 
            var items = verbatimMatches; // limit items to those matches
        }

	    var metadata = api_result.metadata; // get metadata for base urls
        if (metadata){  // get base urls if metdata exists
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
                if (properties){
                    return { 
                        path: item.path,
                        image: properties.profile_image_url,
                        img_m: properties.profile_image_url,
                        title: properties.name,
                        heading: properties.name,
                        url: wwwPathPrefix + properties.web_path,
                        description: properties.short_description
                    };
                }
             },
             relevancy: {
                 primary: [
                    { required: 'properties.profile_image_url' } // only render results with prof img
                 ]
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
