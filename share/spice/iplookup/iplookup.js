(function (env) {
    "use strict";
    env.ddg_spice_iplookup = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('iplookup');
        }
                
        var location,
            blacklists
        api_result.ddg.shortloc ? location=" ("+api_result.ddg.shortloc+")" : location="";
        api_result.ddg.blacklists ? blacklists="Blacklists: <br>"+api_result.ddg.blacklists : blacklists="";
        var title_info = api_result.ddg.famlist[0],
            subtitle_info = "Owner: " + api_result.ddg.shortwho + location + blacklists

        Spice.add({
            id: "iplookup",
            name: "Answer",
            data: api_result.ddg,
            meta: {
                sourceName: "RobTex",
                sourceUrl: api_result.ddg.lnk
            },
            normalize: function(item) {
                return {
                    title: title_info,
                    subtitle: subtitle_info
                };
            },
            templates: {
                group: 'text',
                options: {
                    //content: Spice.iplookup.content,
                    moreAt: true
                }
            },
            relevancy: {
                primary: [{
                	required: 'shortwho'
                }]
            }
        });
    };
}(this));
