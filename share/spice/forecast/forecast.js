(function(env) {
    "use strict";

    env.ddg_spice_forecast = function(api_result) {
        // Exit if we've got a bad forecast
        if (!api_result || !api_result.hourly || !api_result.hourly.data || !api_result.daily || !api_result.daily.data || !api_result.flags['ddg-location']) {
            return Spice.failed('forecast');
        }

        Spice.add({
            id: 'forecast',
            name: 'Weather',
            data: api_result,
            signal: "high",
            meta: {
                sourceUrl: 'https://darksky.net/' + api_result.latitude + ',' + api_result.longitude,
                sourceName: 'Dark Sky'
            }
        });
    };
}(this));
