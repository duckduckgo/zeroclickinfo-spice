function ddg_spice_drinks(api_result) {
    "use strict";

    if(!api_result || api_result.length === 0 || !api_result[0].name) {
        return Spice.failed('drinks');
    }

    Spice.add({
        id: 'drinks',
        data: api_result[0],
        name: "Recipes",
        meta: {
            sourceUrl: api_result[0].url,
            sourceName: 'Drink Project'
        },
        normalize: function(item) {
            var infoboxData = [{
                heading: 'Ingredients:'
            }];

            for (var key in item.ingredients) {
                infoboxData.push({
                    label: item.ingredients[key]
                });
            }

            return {
                description: item.procedure,
                title: item.name,
                infoboxData: infoboxData
            };
        },
        templates: {
            group: 'info'
        }
    });
}
