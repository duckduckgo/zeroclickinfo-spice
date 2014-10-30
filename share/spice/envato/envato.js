(function(env){
	'use strict';

	env.ddg_spice_envato = function(api){
		var has = api.hasOwnProperty('search'),
			fail = !api || !has || (has && !api.search.length);

		if (fail) return Spice.failed('envato');

		var query = DDG.get_query(),
			markets = ['themeforest', 'codecanyon', 'videohive', 'audiojungle', 'graphicriver', 'photodune', '3docean', 'activeden'],
			spice = {
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
			},
			marketplace = query.match(markets.join('|'))

		if (marketplace && marketplace[0] == 'audiojungle'){
			spice.normalize = function(item){
				var info = item.item_info, duration = 0, x = info.length.split(':')

				switch (x.length){
					case 1:
						duration = ~~x[0]
						break;
					case 2:
						duration = (~~x[0] * 60) + ~~x[1]
						break;
					case 3:
						duration = (~~x[0] * 3600) + (~~x[1] * 60) + ~~x[2]
						break;
				}

				return {
					image: info.thumbnail,
					hearts: info.sales,
					duration: duration*1000,
					title: item.description,
					url: item.url,
					streamURL: info.preview_url,
					price: info.cost.replace('.00', '')
				}
			}

			spice.templates = {
				item_custom: 'audio_item',
				options: {
					footer: Spice.envato.audio
				}
			}

			spice.view = spice.model = 'Audio'
		}

		Spice.add(spice);
	}

}(this));