(function(env){
    env.ddg_spice_expatistan = function(api_result) {
        "use strict";

        if(!api_result || api_result.status !== 'OK') {
            return;
        }

        Spice.add({
            id: "expatistan",
            name: "Expatistan",
            data: api_result,
            meta: {
                sourceUrl: api_result.sourceUrl,
                sourceName: 'Expatistan'
            },
            templates: {
                detail: Spice.expatistan.detail
            }
        });
    }
}(this));