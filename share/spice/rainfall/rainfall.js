(function (env) {
    "use strict";
    env.ddg_spice_rainfall = function(api_result){
        
        if (!api_result || !api_result[1][0].value) {
            return Spice.failed('rainfall');
        }

        var annualData = {
            pr: api_result[1][0].value,
            country: api_result[1][0].country.value
        };

        Spice.add({
            id: "rainfall",
            name: "Weather",
            data:  annualData,
            meta: {
                sourceName: "data.worldbank.org",
                sourceUrl: 'http://data.worldbank.org/country/' + annualData.country.replace(/ /g,"-").toLowerCase() + '#cp_cc'
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.rainfall.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
