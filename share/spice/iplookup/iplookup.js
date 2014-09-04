(function (env) {
    "use strict";
    env.ddg_spice_iplookup = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('iplookup');
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
                group: 'info',
                options: {
                    content: Spice.iplookup.content
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
