(function (env) {
    "use strict";
    env.ddg_spice_piratetalk = function(api_result) {

        if (!api_result || api_result.translation==="") {
            return Spice.failed('piratetalk');
        }
        
        Spice.add({
            id: "piratetalk",
            name: "Talk like a Pirate!",
            data: {
                title:api_result.translation,
            },
            meta: {
                sourceName: "Pirate",
                sourceUrl: 'https://pirate-speak.herokuapp.com/',
            },
            templates: {     
                group: 'base',
                options: {
                    content: Spice.piratetalk.piratetalk,
                    moreAt: true
                }
            }
        });
    };
}(this));
