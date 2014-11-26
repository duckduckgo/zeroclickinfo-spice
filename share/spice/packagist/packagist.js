(function (env) {
    "use strict";
    env.ddg_spice_packagist = function(api_result){

        // Validate the response
        if (!api_result || api_result.length === 0) {
            return Spice.failed('packagist');
        }
           
        // Get the original query.
        var script = $('[src*="/js/spice/packagist/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/packagist\/([^\/]*)/)[1];

        // Render the response
        Spice.add({
            id: "packagist",
            name: "Software",
            data: api_result.results,
            meta: {
                sourceName: "packagist.org",
                sourceUrl: 'http://packagist.org/search.json?q=' + encodeURIComponent(query),
                sourceIconUrl: 'http://packagist.org/favicon.ico',
                total: api_result.total,
                itemType: "packages"
            },
            templates:{
                group: 'text',
                detail: false,
		        item_detail: false
            },
            normalize : function(item){
                return{
                    title: item.name,
                    url: item.url,
                    description: item.description
                }
            }
        });
    };
}(this));
