(function(env){
    "use strict";
    env.ddg_spice_aqi = function(api_result) {
        if (api_result.error) {
            return Spice.failed('aqi');
        }

        var query = DDG.get_query();
        var zip = query.match(/\d{5}/);

        Spice.add({
            id: "aqi",
            name: "AQI",
            data: api_result,
            meta: {
                sourceName: "airnowapi.org",
                sourceUrl: 'http://www.airnow.gov/?action=airnow.local_city&zipcode=' + zip
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

    Spice.registerHelper("AQI_ifCond", function(string1, string2, options) {
        return ((string1 === string2) ? options.fn(this) : options.inverse(this));
    });
}(this));
