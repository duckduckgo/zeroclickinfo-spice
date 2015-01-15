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

        Spice.add({
            id: 'similar_sites',
            name: 'Similar Sites',

            data: {
                results: api_result,
                num: num,
                show_more: show_more,
                more_at: query
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
                $("#show_more").click(function() {
                    
                    if ($("#hidden").css('display') == 'none'){
                        $("#hidden").css('display', 'block');
                        $("#show_more").html("<strong>-</strong> Show Less");
                    } else {
                        $("#hidden").css('display', 'none');
                        $("#show_more").html("<strong>+</strong> Show More");
                    }
                });
            }
        });
    };

    Handlebars.registerHelper('list', function(items, from, to) {
        var out = "";
        var link;

        if (to === 0)
            to = Object.keys(items).length - 2;

        for(var i = from; i < to; i++) {
            link = items["r" + i].replace("http://", "")
                                 .replace("https://", "");
            if (link.endsWith('/'))
                link = link.slice(0, -1);

            out += "<div>"
                +  "<img src='http://icons.duckduckgo.com/ip/" + link + ".ico'"
                +  "width='16px' height='16px'/>"
                +  "<a href='" + items["r" + i] + "'>" + link + "</a>";
                +  "<br /></div>";
        }

        return out;
    });
})(this);
