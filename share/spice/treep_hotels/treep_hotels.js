
(function (env) {
    "use strict";
    env.ddg_spice_treep_hotels = function(api_result){

        if (api_result.error) {
            console.log(api_result);
            return Spice.failed('treep_hotels');
        }

        if(api_result.hotels && api_result.hotels.length) {
            Spice.add({
                id: "treep_hotels",
                name: "TreepHotels",
                data: api_result,
                meta: {
                    sourceName: "treep.io",
                    sourceUrl: api_result.url
                },
                templates: {
                    group: 'base',
                    options:{
                        content: Spice.treep_hotels.content,
                        moreAt: true
                    }
                }
            });
        }
    };
}(this));