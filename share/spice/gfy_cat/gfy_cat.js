(function (env) {
    "use strict";
    env.ddg_spice_gfy_cat = function(api_result){

        if (api_result.error) {
            return Spice.failed('gfy_cat');
        }

        var query = DDG.get_query().replace(/\s*(gfycat|gfy cat|gfy?)\s*/i, '');
        var link = encodeURIComponent(query);
        Spice.add({
            id: "gfy_cat",
            name: "Social",
            data: api_result['gfyItem'],
            meta: {
                sourceName: "GfyCat",
                sourceUrl: 'https://gfycat.com/' + link
            },
            normalize: function(item) {
                if(item.title == null){
                    item.title = "Untitled";
                }
                return {
                    name: item.gfyName,
                    author: item.userName
                };
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.gfy_cat.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
