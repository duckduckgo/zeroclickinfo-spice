(function (env) {
    "use strict";
    env.ddg_spice_packagist = function(api_result){

        // Validate the response
        if (!api_result || api_result.error || !api_result.results || api_result.results.length === 0) {
            return Spice.failed('packagist');
        }
           
        // Get the original query.
        var script = $('[src*="/js/spice/packagist/"]')[0];
        var source = $(script).attr("src");
        var encodedQuery = source.match(/packagist\/([^\/]*)/)[1];
        var query = decodeURIComponent(encodedQuery);

        // Render the response
        Spice.add({
            id: "packagist",
            name: "Software",
            data: api_result.results,
            meta: {
                sourceName: "Packagist",
                sourceUrl: 'http://packagist.org/search?q=' + encodedQuery,
                sourceIconUrl: 'http://packagist.org/favicon.ico',
                searchTerm: query,
                itemType: 'PHP Packages'
            },
            templates:{
                group: 'text',
                detail: false,
		        item_detail: false,
                options: {
                    footer: Spice.packagist.footer
                },
                variants: {
                    tileSnippet: 'large'
                }
            },
            normalize: function(item) {
                return {
                    title: item.name,
                    downloads: DDG.commifyNumber(item.downloads),
                    favers: DDG.commifyNumber(item.favers)
                };
            }
        });
    };
}(this));
