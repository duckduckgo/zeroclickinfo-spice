(function (env) {
    "use strict";
    env.ddg_spice_isslocation = function(api_result){

        if (api_result.message !== "success") {
            return Spice.failed('iss_location');
        }

        Spice.add({
            id: "iss_location",
            name: "ISSLocation",
            data: api_result,
            meta: {
                sourceName: "open-notify.org",
                sourceUrl: 'http://open-notify.org'
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.isslocation.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
