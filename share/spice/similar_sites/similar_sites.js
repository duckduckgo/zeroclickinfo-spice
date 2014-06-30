(function(env) {

    env.ddg_spice_similar_sites = function(api_result) {

        var script = $('[src*="/js/spice/similar_sites/"]')[0],
                source = $(script).attr("src"),
                query = source.match(/similar_sites\/([^\/]+)/)[1];

        if(!api_result || !api_result.SimilarSites || api_result.SimilarSites.length === 0) {
            return Spice.failed('similar_sites');
        }

        Spice.add({
            id: "similar_sites",
            name: "Similar Sites",

            data: api_result.SimilarSites,

            meta: {
                total: api_result.SimilarSites.length,
                sourceName: 'SimilarSites',
                sourceUrl: 'http://www.similarsites.com/site/' + query,
                itemType: 'Similar Sites'
            },

            normalize : function(item){
                return {
                    title: item.Url,
                    url: "http://" + item.Url,
                    rating: item.Score*100,
                    icon: "http://icons.duckduckgo.com/ip/" + item.Url + ".ico",
                };
            },

            templates: {
                group: 'icon',
                detail: false,
                item_detail: false,
                options: {
                        footer: Spice.similar_sites.rating,
                        rating: true,
                    }
            }
        });

    }

})(this);
