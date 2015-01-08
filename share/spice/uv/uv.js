(function (env) {
    "use strict";
    env.ddg_spice_uv = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || !api_result.length || api_result.length == 0) {
            return Spice.failed('uv');
        }

//        console.log(api_result);
  
        //extract city and date from first result
        var sampleResult = api_result[0];
        
        var city = DDG.capitalizeWords(sampleResult.CITY.toLowerCase());
        var state = sampleResult.STATE;
        var date = sampleResult.DATE_TIME.split(" ")[0];//remove hour of day part
     
        var maxUVIndex = 0;
        
        var results = $.map(api_result, function(uviForTime, i){
            var uvValue = Integer.parse
            return {
                time: uviForTime.DATE_TIME.substring(uviForTime.DATE_TIME.length - 5),
                uvi: uviForTime.UV_VALUE
            };
            
        });
        // Render the response
        Spice.add({
            id: "uv",

            // Customize these properties
            name: "UV Index",
            data: {
                city: city,
                state: state,
                date: date,
                results: results
            },
            meta: {
                sourceName: "www.epa.gov"
                //sourceUrl: 'http://example.com/url/to/details/' + api_result.name
            },
            templates: {
                group: 'your-template-group',
                options: {
                    content: Spice.uv.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
