(function (env) {
    "use strict";
    env.ddg_spice_uv = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.length || api_result.length != 1) {
            console.log("failed, result: ");
            console.log(api_result);
            return Spice.failed('uv');
        }

        console.log(api_result);
  
        //extract city and date from first result
        var result = api_result[0];
        
        var city = DDG.capitalizeWords(result.CITY.toLowerCase());
        var state = result.STATE;
     
        var uvIndex = parseInt(result.UV_INDEX,10);
        
        //var imagePath = DDG.get_asset_path('uv', 'B_fill_UV'+uvIndex+'.gif');
        
        console.log("city: "+city+", state: "+state+", uvIndex: "+uvIndex);
            
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
                sourceName: "www.epa.gov"
                //sourceUrl: 'http://example.com/url/to/details/' + api_result.name
            },
            normalize: function(item) {
                return {
                    description: item.city+", "+item.state,
                    image: DDG.get_asset_path('uv', 'B_fill_UV'+item.uvIndex+'.gif'),
                    title: "UV Index "+item.uvIndex
                };
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.uv.content,
                    moreAt: false
                }
            }
        });
    };
}(this));
