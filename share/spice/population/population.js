(function (env) {
    "use strict";

    env.ddg_spice_population = function(api_result){

        if (!api_result || !api_result[1][0].value) {
            return Spice.failed('population');
        }

        var result = api_result[1][0],
            population  = result.value,
            countryName = result.country.value,
            lastUpdated = result.date;

        var script = $('[src*="/js/spice/population/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/population\/([^\/]+)\/([^\/]+)/);

        
        var query_country = decodeURIComponent(query[2]);
        var URL_country = countryName.replace(/\,|\./g,"").replace(/ /g,"-").replace(/Dem/g,"democratic").replace(/Rep/g,"republic").toLowerCase();
        
        population = population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        Spice.add({
            id: "population",
            name: "Population",
            data: result,
            meta: {
                sourceName: "worldbank.org",
                sourceUrl: 'http://data.worldbank.org/country/' + URL_country,
            },
           normalize: function(item) {
                return {
                    title: population,
                    subtitle: query_country + " - Population as of " + lastUpdated
                };
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));