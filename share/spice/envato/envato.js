(function(env){
	'use strict';

	env.ddg_spice_envato = function(api){

		console.log(api)

		if (!api) return Spice.failed('envato');

		Spice.add({
			id: 'envato',
			name: 'Envato Marketplace',
			data: api.search,
			normalize: function(item){
				return {
					url: item.url,
					title: item.description,
					price: '$'+item.item_info.cost.replace('.00', ''),
					rating: item.item_info.rating_decimal,
					brand: item.item_info.user,
					img: item.item_info.thumbnail,
					image: item.item_info.thumbnail,
					img_m: item.item_info.thumbnail,
					heading: item.description,
					abstract: '',
					reviewCount: ''
				}
			},
			templates: {
				group: 'products',
				options: {
                    buy: Spice.envato.buy,
                    brand: true,
                    rating: true,
                    price: true
                }
			}
		});
	}

}(this));