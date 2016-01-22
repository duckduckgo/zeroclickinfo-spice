(function (env) {
    "use strict";
    env.ddg_spice_crackhash = function(api_result){

        //old one = Validate the response (customize for your Spice)
    //    if (!api_result || api_result.error) {
     //       return Spice.failed('crackhash');
  //    }

//new one 
	if(!api_result || !api_result.hits || api_result.hits.length === 0) {
	    return Spice.failed('Crackhash');
	}

        // Render the response
        Spice.add({
            id: "crackhash",

            // Customize these properties
            name: "Crackhash",
            data: api_result.hits,
            meta: {
                sourceName: "Crackhash",
                sourceUrl: sourceUrl,
	        itemType: (api_result.hits.length === 1) ? 'Crack hash md5' : 'Crack hash md5',
   	        searchTerm: decodeURIComponent(query)
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title: api_result.title,
		    url:(item.url) ? item.url : 'http://api.md5crack.com/crack/ZFCQCcpS1kLgbCQZ/' + item.objectID,
                    subtitle: api_result.subtitle,
                    image: api_result.icon
                };
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.crackhash.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
