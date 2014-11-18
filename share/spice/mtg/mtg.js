(function (env) {
    "use strict";
    env.ddg_spice_mtg = function(api_result){


        if (api_result.error) {
            return Spice.failed('mtg');
        }

        Spice.add({
            id: "mtg",
            name: "Magic The Gathering",
            data: api_result[0],
            meta: {
                sourceUrl: "http://www.mtgdb.info/cards/" + api_result[0].id,
                sourceName: "http://mtgdb.info",
                sourceIcon: true,

            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.mtg.content,
                    moreAt: true
                }
            }
        });
        
    
    };
}(this));

