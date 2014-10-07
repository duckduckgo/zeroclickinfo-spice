(function (env) {
    "use strict";
    env.ddg_spice_rainfall = function(api_result){

       if (!api_result || !api_result[1][0].value) {
            return Spice.failed('rainfall');
        }
        
        // Retrieve search query and extract country, uppercase first letters.
        var query_country = DDG.get_query()
                .toLowerCase().replace(/in|for|annual|the|rainfall|'/gi, "").trim().replace(/\b[a-z](?=[a-z]{2})/g, function(letter) {
                return letter.toUpperCase(); } );
       
        var annualData = {
            precipitation: api_result[1][0].value, // Precipitation in millimeters 
            country: query_country
        };

        Spice.add({
            id: "rainfall",
            name: "Weather",
            data:  annualData,
            meta: {
                sourceName: "worldbank.org",
                sourceUrl: 'http://data.worldbank.org/country/' + api_result[1][0].country.value.replace(/\,|\./g,"").replace(/ /g,"-").replace(/Dem/g,"democratic").replace(/Rep/g,"republic").toLowerCase() //Clean returned country name
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.rainfall.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
