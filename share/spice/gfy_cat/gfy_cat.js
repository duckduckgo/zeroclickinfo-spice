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
            data: api_result.gfyItem,
            meta: {
                sourceName: "GfyCat",
                sourceUrl: 'https://gfycat.com/' + link
            },
            normalize: function(item) {
                if(item.title === null){
                    item.title = "Untitled";
                }
                var totalRatings = parseInt(item.likes,10) + parseInt(item.dislikes,10);
                if(totalRatings > 0){
                    item.ratingPercent = item.likes / totalRatings * 100;
                } else{
                    item.ratingPercent = 0;
                }
                return {
                    name: item.gfyName,
                    author: item.userName,
                    defaultUrl: 'https://gfycat.com/' + link
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
