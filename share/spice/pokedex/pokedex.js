(function (env) {
	"use strict";
	
	env.ddg_spice_pokedex = function(api_result) {
		
		if (api_result.error) {
			return Spice.failed('pokedex');
		}
		
		Spice.add({
			id: "pokedex",
			name: "Pokedéx",
			data: api_result,
			meta: {
				sourceName: "pokeapi.co",
			},
			templates: {
				group: 'base',
				options:{
					content: Spice.pokedex.pokedex,
					moreAt: false
				}
			}
		});
	};
} (this));
