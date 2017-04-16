function spice_params() {
    var script = $('[src*="/js/spice/world_heritage_sites/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/world_heritage_sites\/([^\/]+)/)[1];
    return decodeURIComponent(query);
}

(function (env) {
    "use strict";
    env.ddg_spice_world_heritage_sites = function(api_result){
        if (api_result.QUERYRESULT.DATA.length == 0) {
            return false;
        }

        function normalize(query_result) {
            var columns = query_result.COLUMNS;
            var added = [];  // need to keep track, as the API returns the same entry multiple times when it has multiple locations
            var sites = [];
            $(query_result.DATA).each(function(i, row) {
                var site = {};
                $(row).each(function(i, value){
                    site[columns[i]] = value;
                });
                if (!(site.ID_NO in added)) {
                    added[site.ID_NO] = true;
                    sites.push(site);
                }
            });
            sites = sites.sort(function(a, b) {
                return a.NAME.localeCompare(b.NAME);
            });
            return {'sites': sites};
        }

        var params = spice_params();
        Spice.add({
            id: "world_heritage_sites",
            name: "World Heritage Sites in " + params,
            data: api_result.QUERYRESULT,
            meta: {
                sourceName: "World Heritage Convention",
                sourceUrl: 'http://whc.unesco.org/?cid=31&l=en&search=' + params
            },
            normalize: normalize,
            templates: {
                group: 'base',
                options:{
                    content: Spice.world_heritage_sites.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
