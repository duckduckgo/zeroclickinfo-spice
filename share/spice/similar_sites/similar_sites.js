(function(env) {
    'use strict';

    env.ddg_spice_similar_sites = function(api_result) {

        var script = $('[src*="/js/spice/similar_sites/"]')[0],
                source = $(script).attr("src"),
                query = source.match(/similar_sites\/([^\/]+)/)[1];

        if(!api_result || api_result.num === 0 || api_result.status !== 'ok') {
            return Spice.failed('similar_sites');
        }

        var num = api_result.num;
        var show_more = true;
        if (num < 5)
            show_more = false;

        Spice.add({
            id: 'similar_sites',
            name: 'Similar Sites',

            data: {
                results: api_result,
                num: num,
                show_more: show_more,
                more_at: query
            },

            normalize: function (data) {
                var sites = [];

                for (var i = 0; i < data.num; i++) {
                    var url = data.results['r' + i];
                    sites.push({
                        url: url,
                        name: url.replace(/^https?:\/\/(www\.)?|\/+$/g, "")
                    });
                };

                return {
                    sites: sites
                }
            },

            meta: {
                total: num,
                sourceName: 'SimilarSites',
                sourceUrl: 'http://www.similarsites.com/site/' + query,
                sourceIcon: true,
                itemType: 'Similar Sites'
            },

            templates: {
                group: 'base',
                options: {
                    content: Spice.similar_sites.content
                }
            },

            onShow: function() {
                var $dom = Spice.getDOM('similar_sites');
                if ($dom && $dom.length) {
                    var $hidden = $dom.find('.is-hidden'),
                        $show_more = $dom.find('.show_more');

                    $show_more.click(function() {
                        $hidden.toggle();
                        $show_more.toggleClass('is-expanded');
                    });
                }
            }
        });
    };

})(this);
