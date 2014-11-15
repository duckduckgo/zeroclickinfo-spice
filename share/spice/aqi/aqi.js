(function(env){
    "use strict";
    env.ddg_spice_aqi = function(api_result) {
        if (api_result.error) {
            return Spce.failed('aqi');
        }

        Spice.add({
            id: "aqi",
            name: "AQI",
            data: api_result,
            meta: {
                sourceName: "airnowapi.org",
                sourceUrl: 'http://www.airnowapi.org/CurrentObservationsByZip/query'
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.aqi.content,
                    moreAt: true
                }
            }
        })
    }
}(this));
