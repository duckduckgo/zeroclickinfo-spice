(function(env) {

env.ddg_spice_similar_sites = function(api_result) {

    var script = $('[src*="/js/spice/similar_sites/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/similar_sites\/([^\/]+)/)[1];

    Spice.add({
        id: "SimilarSites",
        name: "SimilarSites",

        data: api_results.SimilarSites,

        meta: {
            total: api_results.SimilarSites.length,
            sourceName: 'SimilarSites',
            sourceUrl: 'http://www.similarsites.com/site/' + query,
            itemType: 'Similar Sites'
        },

        normalize = function(item){
            return {
                title: item.url,
                url: item.Url,
                rating: parseFloat(item.Score) * 100
            };
        },

        template_group: 'products',
    });

}

})(this);
