(function(env) {
    "use strict";
    env.ddg_spice_rain = function(api_result) {
        // Check for errors.
        if(!api_result || api_result.error || !api_result.currently || !api_result.flags['ddg-location']) {
            return Spice.failed('rain');
        }

        Spice.add({
            id: 'rain',
            name: 'Rain',
            data: api_result,
            meta: {
                sourceName: "Dark Sky",
                sourceUrl: "https://darksky.net/" + api_result.latitude + "," + api_result.longitude,
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
                    moreAt: true,
                    moreText: {
                            href: "/?ia=weather&q=weather+" + api_result.flags['ddg-location'],
                            text: "Weather Forecast for " + api_result.flags['ddg-location'],
                    }
                }
            }
        });
    }
}(this));
