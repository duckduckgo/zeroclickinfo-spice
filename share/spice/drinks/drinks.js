(function (env) {
    "use strict";

    function getInfoBoxData(item) {
        var infoboxData = [{
            heading: 'Ingredients:'
        }];
        for (var i = 1; i <= 15; i++) {
            if(item["strIngredient" + i] !== "") {
                infoboxData.push({
                    label: item["strMeasure" + i] + "" + item["strIngredient" + i]
                });
            }
        }
        return infoboxData;
    }

    env.ddg_spice_drinks = function(api_result){

        if (!api_result || api_result.error || !api_result.drinks || api_result.drinks.length === 0) {
            return Spice.failed('drinks');
        }

        var drink = api_result.drinks[0];

        Spice.add({
            id: 'drinks',
            data: drink,
            name: "Recipes",
            meta: {
                sourceUrl:  "http://www.thecocktaildb.com/drink.php?c=" + drink.idDrink,
                sourceName: 'TheCocktailDB'
            },
            normalize: function(item) {
                return {
                    description: item.strInstructions,
                    title: item.strDrink,
                    url: "http://www.thecocktaildb.com/drink.php?c=" + item.idDrink,
                    image: item.strDrinkThumb || null,
                    infoboxData: getInfoBoxData(item)
                };
            },
            templates: {
                group: 'info'
            }
        });
    };
}(this));