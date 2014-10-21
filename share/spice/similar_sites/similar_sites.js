(function(env) {

    env.ddg_spice_similar_sites = function(api_result) {

        var script = $('[src*="/js/spice/similar_sites/"]')[0],
                source = $(script).attr("src"),
                query = source.match(/similar_sites\/([^\/]+)/)[1];

        if(!api_result || !api_result.num === 0) {
            return Spice.failed('similar_sites');
        }

        var num = api_result.num;
        var show_more = true;
        if (num < 5)
            show_more = false;

        delete api_result['num'];
        delete api_result['status'];

        Spice.add({
            id: "similar_sites",
            name: "Similar Sites",

            data: {
                results: api_result,
                num: num,
                show_more: show_more,
                show_more_count: num-5
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
            }
        });
    };

    Handlebars.registerHelper('list', function(items, from, to) {
        var out = "<ul>";

        if (to === 0)
            to = Object.keys(items).length;

        for(var i = from; i < to; i++) {
            out += "<img src='http://icons.duckduckgo.com/ip/" + items["r" + i].replace("http://", "")  + ".ico' width='16px' height='16px'/>"
            out += "<a href='" + items["r" + i] + "'> " + items["r" + i] + "</a>";
            out += "<hr />"
        }

        return out + "</ul>";
    });
})(this);
