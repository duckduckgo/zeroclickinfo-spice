(function (env) {
    "use strict";
    env.ddg_spice_rainfall = function(api_result){
        
        
        if (!api_result) {
            return Spice.failed('rainfall');
        }
        console.log(api_result);
        var annualData = {
            pr: api_result[1][0].value,
            country: api_result[1][0].country.value,
        };
        
        Spice.add({
            id: "rainfall",
            name: "Weather",
            data:  annualData,
            meta: {
                sourceName: "climatedataapi.worldbank.org",
                //sourceUrl: '' + api_result.name
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.rainfall.content,
                    moreAt: false
                }
            }
        });
    };
}(this));
