(function (env) {
    "use strict";
    env.ddg_spice_tfl_status = function(api_result){

        Spice.add({
            id: "tfl_status",
            name: "Travel",
            data: api_result,
            meta: {
                sourceName: "tfl.gov.uk",
    		sourceUrl: 'http://tfl.gov.uk/tube-dlr-overground/status/#line-' + api_result.id,
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.tfl_status.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
