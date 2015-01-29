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
            uvIndex = parseInt(result.UV_INDEX,10),
            risk = "extreme",
            riskTitle = "Extreme Risk",
            protection = "Take all precautions: Wear sunglasses and use SPF 30+ sunscreen, "
                        +"cover the body with a long-sleeve shirt and trousers, wear a very broad hat, "
                        +"and avoid the sun from three hours before until three hours after solar noon.";
        
        //uv index risks and descriptions taken from http://en.wikipedia.org/wiki/Ultraviolet_index#How_to_use_the_index
        if(uvIndex < 3){
            risk = "low";
            riskTitle = "Low Danger";
            protection = "Wear sunglasses on bright days; use sunscreen if there is snow on the ground, "
                        +"which reflects UV radiation, or if you have particularly fair skin.";
        } else if(uvIndex < 6){
            risk = "moderate";
            riskTitle = "Moderate Risk";
            protection = "Take precautions, such as covering up, if you will be outside. Stay in shade near midday when the sun is strongest.";
        } else if (uvIndex < 8){
            risk = "high";
            riskTitle = "High Risk";
            protection = "Cover the body with sun protective clothing, use SPF 30+ sunscreen, wear a wide-brim hat, "
                        +"reduce time in the sun within three hours of solar noon, and wear sunglasses.";
        } else if (uvIndex < 11){
            risk = "veryhigh";
            riskTitle = "Very High Risk";
            protection = "Take all precautions: Wear sunglasses and use SPF 30+ sunscreen, cover the body with a long-sleeve shirt and trousers, "
                        +"wear a very broad hat, and avoid the sun from three hours before until three hours after solar noon.";
        }

        // Render the response
        Spice.add({
            id: "uv",

            // Customize these properties
            name: "UV Index",
            data: {
                city: city,
                state: state,
                uvIndexName: result.UV_INDEX,
                risk: risk,
                riskTitle: riskTitle,
                protection: protection
            },
            meta: {
                sourceName: "EPA",
                sourceUrl: 'http://www.epa.gov/enviro/facts/uv/uv_descriptions.html'
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.uv.uv
                }
            }
        });
    };
}(this));