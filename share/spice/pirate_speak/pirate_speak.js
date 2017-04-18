(function (env) {
    "use strict";
    env.ddg_spice_pirate_speak = function(api_result) {

        if (!api_result || api_result.translation ==='') {
            return Spice.failed('pirate_speak');
        }

        Spice.add({
            id: "pirate_speak",

            name: "Answer",
            data: {
                title:api_result.translation,
            },
            meta: {
                sourceName: "Pirate",
                sourceUrl: "https://pirate-speak.herokuapp.com/" 
            },
            
            templates: {
                group: 'text',
                options: {
                    pirate_speak: Spice.pirate_speak.pirate_speak,
                    moreAt: true
                }
            }
        });
    };
}(this));
