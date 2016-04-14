(function (env) {
    "use strict";
    env.ddg_spice_piratetalk = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.translation==="") {
            return Spice.failed('piratetalk');
        }

        // Render the response
        Spice.add({
            id: "piratetalk",

            // Customize these properties
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
