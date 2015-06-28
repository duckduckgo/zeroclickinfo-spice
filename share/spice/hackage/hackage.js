(function (env) {
    "use strict";
    env.ddg_spice_hackage = function(api_result) {
        function docString(doc) {
            return doc.replace(/Version .*/,"")
        }

        function version(doc){
            try {
                var version = doc.match(/\d\.\d\.?\d?\.?\d?/);
                return version
            }
            catch (err) {}
        }

        function versionInt(v) {
            if (v == undefined) {
                return -1;
            }
            while(v.indexOf(".") != -1) {
                v = v.replace(".","");
            }
            return parseInt(v);
        }

        var results = api_result.results;
        if (results.length > 30)
            results = results.splice(0,30);

        // Get the original query
        var script = $('[src*="/js/spice/hackage/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/hackage\/([^\/]*)/)[1];

        if (api_result.error) {
            return Spice.failed('hackage');
        }

        Spice.add({
            id: "hackage",
            name: "Hackage",
            data: results,
            meta: {
                sourceName: "Hackage",
                sourceUrl: "https://hackage.haskell.org/packages/search?terms=" + query
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false
            },

            normalize : function(item) {
                var v = version(item.docs)
                var info = {
                    title: item.self,
                    description: docString(item.docs),
                    url: item.location
                 }
                if (v) {
                    info.subtitle = "Version: " + v
                }
                return info;
            },

            sort_fields: {
                moreVersions: function(a, b) {
                    var x = versionInt(version(a));
                    var y = versionInt(version(b));
                    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
                }
            },
            sort_default: 'moreVersions'
        });
    };
}(this));
