(function (env) {
    "use strict";
    env.ddg_spice_rainfall = function(api_result){

       // Ensure API returns a vaild result including precipitation value
       if (!api_result || !api_result[1][0].value) {
            return Spice.failed('rainfall');
        }

        var script = $('[src*="/js/spice/rainfall/"]')[0],
             source = $(script).attr("src"),
             query = source.match(/rainfall\/([^\/]+)\/([^\/]+)\/([^\/]+)/);
        
        //Extract country name from query and fix URL Encoding
        var query_country = query[3].replace(/%20/g," ");
               
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
