(function (env) {
    "use strict";
    env.ddg_spice_cyclocity = function(api_result){

        if (api_result.error || api_result.length === 0) {
            return Spice.failed('cyclocity');
        }

        // Check if the city requested is in the list of cities managed by Cyclocity
        var filtered_results = []

        // For each contract
        for (var contract_i=0; contract_i<api_result.length; contract_i++) {

            // If the query is containing the commercial name, we keep it in the filtered list
            if (DDG.isRelevant(api_result[contract_i].commercial_name, ['bike', 'bicycle', 'bycycle'])){
                filtered_results.push(api_result[contract_i])
            }

            var cities = api_result[contract_i].cities

            // For each city in a contract
            for (var city_i=0; city_i<cities.length; city_i++) {

                //If the query is containing the city, we keep it in the filtered list
                if (DDG.isRelevant(cities[city_i], ['bike', 'bicycle', 'bycycle'])){
                    filtered_results.push(api_result[contract_i])
                }

            }
        }

        // Remove duplicate
        function onlyUnique(value, index, self) { 
            return self.indexOf(value) === index;
        }
        filtered_results = filtered_results.filter(onlyUnique)

        //If there is no match
        if (filtered_results.length === 0 ) {
            return Spice.failed('cyclocity');
        }

        Spice.add({
            id: "cyclocity",
            name: "Bikes",
            data: filtered_results,
            meta: {
                sourceName: "Cyclocity",
                sourceUrl: "http://www.cyclocity.com/"
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.cyclocity.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
