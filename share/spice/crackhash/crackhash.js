(function (env) {
    "use strict";
    env.ddg_spice_crackhash = function(api_result){

	if(!api_result || !api_result.hits || api_result.hits.length === 0) {
	    return Spice.failed('Crackhash');
	}
        Spice.add({
            id: "crackhash",

            name: "crackhash",
            data: api_result.hits,
            meta: {
                sourceName: "crackhash",
                sourceUrl: sourceUrl,
	        itemType: (api_result.hits.length === 1) ? 'crack hash' : 'crack',
   	        searchTerm: decodeURIComponent(query)
            },
            normalize: function(item) {
                return {
                    title: api_result.title,
		    url:(item.url) ? item.url : 'http://flipchan.se/crack/' + item.objectID,
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
