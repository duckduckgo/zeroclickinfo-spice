(function (env) {
    "use strict";
    env.ddg_spice_uv = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.length || api_result.length !== 1) {
            return Spice.failed('uv');
        }

        //extract city and date from first result
        var result = api_result[0];
        
        var city = DDG.capitalizeWords(result.CITY.toLowerCase()),
            state = result.STATE,
            uvIndex = parseInt(result.UV_INDEX,10);
  
        // Render the response
        // Note: images provided by http://www.who.int/uv/intersunprogramme/activities/uv_index/en/index2.html
        Spice.add({
            id: "uv",

            // Customize these properties
            name: "UV Index",
            data: {
                city: city,
                state: state,
                uvIndex: uvIndex
            },
            meta: {
                sourceName: "EPA",
                sourceUrl: 'http://www.epa.gov/enviro/facts/uv/uv_descriptions.html'
            },
            normalize: function(item) {
                return {
                    description: item.city+", "+item.state,
                    image: DDG.get_asset_path('uv', 'A_UV'+item.uvIndex+'.gif'),
                    title: "UV Index "+(item.uvIndex >= 11 ? "11+" : item.uvIndex)
                };
            },
            templates: {
                group: 'info',
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));
