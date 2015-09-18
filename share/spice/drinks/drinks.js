(function (env) {
    "use strict";

    function getInfoBoxData(item) {
        var infoboxData = [{
            heading: 'Ingredients:'
        }];
        for (var i = 1; i <= 15; i++) {
            infoboxData.push({
                label: item["strMeasure" + i] + "" + item["strIngredient" + i]
            });
        }
        return infoboxData;
    }

    env.ddg_spice_drinks = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('drinks');
        }

        var drink = api_result.drinks[0];

        Spice.add({
            id: 'drinks',
            data: drink,
            name: "Drinks",
            meta: {
                sourceUrl:  "http://www.thecocktaildb.com/drink.php?c=" + drink.idDrink,
                sourceName: 'TheCocktailDB'
            },
            normalize: function(item) {
                return {
                    description: item.strInstructions,
                    title: item.strDrink,
                    infoboxData: getInfoBoxData(item)
                };
            },
            templates: {
                group: 'info'
            }
        });
    };
}(this));