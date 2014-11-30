(function (env) {
    "use strict";
    
    env.ddg_spice_encyclopedia_of_life = function (api_result) {
        if (!api_result) {
            return Spice.failed('encyclopedia_of_life');
        }
        
        var results = api_result.results;
        
        Spice.add ({
            id: "encyclopedia_of_life",
            name: "Encyclopedia of Life",
            data: results,
            meta: {
                sourceName: "Encyclopedia of Life",
                sourceUrl: "http://eol.org/"
            },
            templates: {
                group: "media",
                detail: false,
                item_detail: false
            },
            normalize: function (item) {
                //Return data for display
                return {
                    image: "http://www.taxondata.steveglick.net/images.php?id=" + item.id,
                    title: item.name,
                    url: item.link
                };
            }
        })
    }
}(this));