(function (env) {
    "use strict";
    env.ddg_spice_metar = function(api_result) {
        
        if (!api_result || api_result.Error) {
            return Spice.failed('metar');
        }    

        Spice.add({
            id: "metar",
            name: 'Weather',
            data: api_result,
            meta: {
                sourceName: "Aviation Weather REST API",
                sourceUrl: "http://avwx.rest"
            },
            normalize: function(item) {
                return {
                    title: item["Station"], 
                    subtitle: item["Time"],
                    description: item["Raw-Report"]
                };
            },
            templates: {
                group: 'text'
            }
        });
    };
}(this));
