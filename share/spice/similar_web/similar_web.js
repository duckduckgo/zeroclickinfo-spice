(function(env) {

env.ddg_spice_similar_web = function(api_result) {

    var script = $('[src*="/js/spice/similar_web/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/similar_web\/([^\/]+)/)[1];

    Spice.add({
        id: "SimilarWeb",
        name: "SimilarWeb",

        data: api_results.SimilarSites,

        meta: {
            total: api_results.SimilarSites.length,
            sourceName: 'SimilarWeb',
            sourceUrl: 'http://www.similarsites.com/site/' + query,
            itemType: 'Similar Webs'
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
