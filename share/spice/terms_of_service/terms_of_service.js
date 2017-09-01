(function (env) {
    "use strict";
    env.ddg_spice_terms_of_service = function(api_result){
        
        if (!api_result || api_result.error) {
            return Spice.failed('terms_of_service');
        }
        var script = $('[src*="/js/spice/terms_of_service/"]')[0],
        source = $(script).attr("src"),
        query = source.match(/terms_of_service\/([^\/]+)/)[1],
        decodedQuery = decodeURIComponent(query);
        
        Spice.add({
            id: "terms_of_service",
            name: "Terms of Service",
            data: api_result,
            meta: {
                sourceName: "Terms of Service; Didn't Read",
                sourceUrl: 'https://tosdr.org#' + decodedQuery
            },
            normalize: function(item) {
                var tldrresult = (item.pointsData[item.points[0]].tosdr.tldr);
                if (item.class == false) {
                    return {
                        title: "No classification yet",
                        description: tldrresult
                    }
                }
                else {
                return {
                    title: "Class " + item.class,
                    description: tldrresult
                };
                }
            },
            templates: {
                group: 'info'
            }
        });
    };
}(this));
