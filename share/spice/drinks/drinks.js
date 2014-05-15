function ddg_spice_drinks(api_result) {
    "use strict";

    if(!api_result || api_result.length === 0 || !api_result[0].name) {
        return Spice.failed('drinks');
    }

    api_result[0].isArray = $.isArray(api_result[0].ingredients);

    Spice.add({
        id: 'drinks',
        data: api_result[0],
	name: "Recipes",
	meta: {
            sourceUrl: api_result[0].url,
            sourceName: 'Drink Project'
	},
	normalize: function(item) {
	    return {
		description: item.procedure,
		title: item.name,
		auxTitle: 'Ingredients'
	    };
	},
        templates: {
	    group: 'info',
	    options: {
		aux: Spice.drinks.infobox
	    }
        }
    });
}
