(function (env) {
    "use strict";
    env.ddg_spice_iss_location = function(api_result){

        if (api_result.message !== "success") {
            return Spice.failed('iss_location');
        }

        Spice.add({
            id: "iss_location",
            name: "ISSLocation",
            data: api_result,
            meta: {
                sourceName: "open-notify.org",
                sourceUrl: 'http://api.open-notify.org/iss-now.json'
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.iss_location.content,
                    moreAt: true
                }
            }
        });
    };
}(this));