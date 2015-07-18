// curl https://www.haskell.org/hoogle/\?mode\=json\&hoogle\=json
// API response format.
// {"results" => [
//    {"location"=>"http://hackage.haskell.org/package/JSON-Combinator",
//     "self"=>"package JSON-Combinator",
//     "docs"=> "A combinator library on top of a generalised JSON type.\n\nVersion 0.2.8 "}]}

(function (env) {
    "use strict";
    env.ddg_spice_hackage = function(api_result) {

        // get documentation string
        function docString(doc) {
            return doc.replace(/Version .*/,"");
        }

        // get version from docs.
        // supported version formats: [1.2, 1.2.3, 1.2.3.4]
        function version(doc){
            try {
                var version = doc.match(/\d\.\d\.?\d?\.?\d?/);
                return version;
            }
            catch (err) {
                return undefined;
            }
        }

        // converts "1.2.3" to 1230
        // converts "0.0.1" to 10
        // helps in comparing version strings in different format.
        function versionInt(v) {
            if (v == undefined) {
                return -1;
            }
            v = v.replace(/\./g,"")
            // Assuming semantic version groups do not exceed 4
            var toAppend = 4 - v.length;
            v = v + Array(toAppend + 1).join("0");
            return parseInt(v);
        }


        if(!api_result || api_result.results.length == 0) {
            return Spice.failed('hackage');
        }
        var results = api_result.results;
        if (results.length > 30)
            results = results.splice(0,30);


        // Get the original query
        var script = $('[src*="/js/spice/hackage/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/hackage\/([^\/]*)/)[1];

        Spice.add({
            id: "hackage",
            name: "Hoogle",
            data: results,
            meta: {
                sourceName: "Hoogle",
                sourceUrl: "https://www.haskell.org/hoogle/?hoogle=" + query,
                snippetChars: 85
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                variants: {
                    tileTitle: "2line"
                }
            },

            normalize : function(item) {
                var v = version(item.docs);
                var description = docString(item.docs);
                if (description == "") {
                    return;
                }
                var info = {
                    title: item.self,
                    description: description,
                    url: item.location
                };
                if (v) {
                    info.altSubtitle = "Version: " + v;
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
