(function(env) {
    "use strict";
    env.ddg_spice_isslocation = function(api_result) {
        console.log("API result is", api_result);
        if (api_result.message !== "success") {
            return Spice.failed('isslocation');
        }
        api_result.iss_position.latitude = (Math.round(api_result.iss_position.latitude * 100) / 100).toFixed(2);
        api_result.iss_position.longitude = (Math.round(api_result.iss_position.longitude * 100) / 100).toFixed(2);
        
        Spice.add({
            id: "isslocation",
            name: "ISSLocation",
            data: api_result,
            meta: {
                sourceName: "open-notify.org",
                sourceUrdl: 'http://open-notify.org'
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.isslocation.content,
                    moreAt: true
                }
            }
        });
    };
}(this));