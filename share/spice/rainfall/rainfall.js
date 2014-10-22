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
        var query_country = decodeURIComponent(query[3]);
                
        //Clean returned country name
        var URL_country = api_result[1][0].country.value.replace(/\,|\./g,"").replace(/ /g,"-").replace(/Dem/g,"democratic").replace(/Rep/g,"republic").toLowerCase();
        
        var annualData = {
            precipitation: api_result[1][0].value, 
            country: query_country
        };

        Spice.add({
            id: "rainfall",
            name: "Weather",
            data:  annualData,
            meta: {
                sourceName: "worldbank.org",
                sourceUrl: 'http://data.worldbank.org/country/' + URL_country
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
