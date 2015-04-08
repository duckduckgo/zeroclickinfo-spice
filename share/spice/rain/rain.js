function ddg_spice_rain (api_result) {
    "use strict";

    // Check for errors.
    if(!api_result || api_result.error || !api_result.currently || !api_result.flags['ddg-location']) {
        return Spice.failed('rain');
    }

    Spice.add({
        id: 'rain',
        name: 'Rain',
        data: api_result,
        meta: {
            sourceName: "Forecast.io",
            sourceUrl: "http://forecast.io/#/f/" + api_result.latitude + "," + api_result.longitude,
        },
        normalize: function(item) {
            var is_raining = ["hail", "thunderstorm", "tornado", "sleet", "rain"].indexOf(item.currently.icon) >= 0;

            return {
                title: is_raining ? "Yes!" : "No.",
                location: item.flags['ddg-location'],
                is_raining: is_raining
            };
        },
        templates: {
            group: 'text',
            options: {
                content: Spice.rain.content,
                moreAt: true
            }
        }
    });
};
