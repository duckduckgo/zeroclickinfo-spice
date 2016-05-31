(function (env) {
    "use strict";
    env.ddg_spice_iplookup = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('iplookup');
        }
        
        //Check if query is looking for reverse IP information fail if none is found.
        var query = DDG.get_query();
        if (query.match(/reverse|dns/)){
            if(!api_result.ddg || !api_result.ddg.famlist || !api_result.ddg.famlist[0]) {
                return Spice.failed('iplookup');
            }
        }
                
        // Assign relevent API information to title_info, subtitle_info for use in the normalize function
        var location = api_result.ddg.shortloc ? " ("+api_result.ddg.shortloc+")" : "",
            title_info = api_result.ddg.famlist[0],
            subtitle_info = "Owner: " + api_result.ddg.shortwho + location;

        var blacklists = api_result.ddg.blacklists,
            contentData = null;

        if(typeof blacklists !== "undefined" && blacklists.length > 0) {
            contentData = Spice.iplookup.content;
        }

        Spice.add({
            id: "iplookup",
            name: "Answer",
            data: api_result.ddg,
            meta: {
                sourceName: "RobTex",
                sourceUrl: api_result.ddg.lnk
            },
            templates: {
                group: 'text',
                options: {
                    content: contentData,
                    moreAt: true
                }
            },
            normalize: function(item) {
                return {
                    title: title_info,
                    subtitle: subtitle_info
                };
            },
            relevancy: {
                primary: [{
                	required: 'shortwho'
                }]
            }
        });
    };
}(this));
