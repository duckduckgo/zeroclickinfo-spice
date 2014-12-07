(function(env) {
    "use strict";
    env.ddg_spice_isslocation = function(api_result) {
        console.log("API result is", api_result);
        if (api_result.message !== "success") {
            return Spice.failed('isslocation');
        }
        var issLatitude = (Math.round(api_result.iss_position.latitude * 100) / 100).toFixed(2);
        var issLongitude = (Math.round(api_result.iss_position.longitude * 100) / 100).toFixed(2);

        Spice.add({
            id: "isslocation",
            name: "ISSLocation",
            model: 'Location',
            view: 'Map',
            data: [{
                display_name: "International Space Station",
                name: "International Space Station",
                lat: issLatitude,
                lon: issLongitude
            }],
            meta: {
                sourceName: "open-notify.org",
                sourceUrdl: 'http://open-notify.org'
            },
            normalize: function(item) {
                
                return {
                    lat: issLatitude,
                    lon: issLongitude
                };
            }
        });
    };
}(this));