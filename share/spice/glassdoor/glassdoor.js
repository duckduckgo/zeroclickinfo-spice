(function (env) {
    "use strict";

    env.ddg_spice_glassdoor = function(api_result) {

        if (!api_result || !api_result.response.employers || api_result.response.employers.length === 0) {
            return Spice.failed("glassdoor");
        }
        
        var query = DDG.get_query().replace('glassdoor','');
        
        Spice.add({
            id: 'glassdoor',

            name: 'Social',
            data: api_result.response.employers.reverse(),
            meta: {
                 sourceName: 'Glassdoor',
                 sourceLogo: {
                    url: DDG.get_asset_path('glassdoor','glassdoor_logo.png')
                 },
                 sourceUrl: api_result.response.attributionURL,
                 searchTerm: query,
                 total: api_result.response.employers,
                 itemType: (api_result.response.employers.length === 1) ? 'Glassdoor featured review' : 'Glassdoor featured reviews'
                 
            },
            normalize: function(item) {
                return {
                    title: item.name,
                    url: item.featuredReview.attributionURL,
                    icon: item.squareLogo,
                    description: DDG.strip_html(item.featuredReview.pros),   
                    numRatings: item.numberOfRatings,
                    location: item.featuredReview.location            
                };
            },
            templates: {
                group: 'icon',
                options: {
                    moreAt: true,
                    footer: Spice.glassdoor.footer                  
                },
                detail: false,
                item_detail: false,
                variants: {
                     tileSnippet: "large"
                }
            },
            
        });
    };
}(this));
