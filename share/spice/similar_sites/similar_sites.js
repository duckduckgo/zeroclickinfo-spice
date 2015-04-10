(function(env) {
    'use strict';

    env.ddg_spice_similar_sites = function(api_result) {

        var script = $('[src*="/js/spice/similar_sites/"]')[0],
                source = $(script).attr("src"),
                query = source.match(/similar_sites\/([^\/]+)/)[1];

        if(!api_result || api_result.num === 0 || api_result.status !== 'ok') {
            return Spice.failed('similar_sites');
        }

        Spice.add({
            id: 'similar_sites',
            name: 'Similar Sites',
            data: api_result,
            normalize: function (data) {
                var sites = [];

                for (var i = 0; i < data.num; i++) {
                    var url = data['r' + i];
                    sites.push({
                        url: url,
                        name: url.replace(/^https?:\/\/(www\.)?|\/+$/g, "")
                    });
                }

                return {
                    list: sites
                };
            },
            meta: {
                sourceName: 'SimilarSites',
                sourceUrl: 'http://www.similarsites.com/site/' + query,
            },
            templates: {
                group: 'list',
                options: {
                    list_content: Spice.similar_sites.list_content
                }
            }
        });
    };

})(this);
