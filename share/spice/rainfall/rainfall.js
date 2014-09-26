(function (env) {
    "use strict";
    env.ddg_spice_rainfall = function(api_result){
        
        
        if (!api_result) {
            return Spice.failed('rainfall');
        }
        
        var annualData = {
            //round two decimal places
            pr: Math.round(api_result[0].annualData * 100) / 100,
            text: "Average precipitation in depth (mm per year)"
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
