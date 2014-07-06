(function(env){
	"use strict";    
	env.ddg_spice_trakt_episode = function(api_result) {
		if (!api_result || api_result.length === 0) {
			return Spice.failed('trakt');
		}
		var SKIP_REGEX = / *(tv|episode|on) */g,
			DEFAULT_IMAGE_REGEX = /^(?!.*http:\/\/slurm.trakt.us\/images\/(poster-dark|fanart-dark|banner)\.jpg).*$/,
			SKIP_ARRAY = ["tv", "episode"],
			query = DDG.get_query().replace(SKIP_REGEX, "");

		api_result = api_result.slice(0, 12);
		$.each(api_result, function(ind, item) {
			var s = item.episode.ratings.loved - item.episode.ratings.hated;
			var order = Math.log(Math.max(Math.abs(s), 1)) / Math.LN10;
			var sign = s > 0 ? 1 : s < 0 ? -1 : 0;
			item.hotness = sign * order;
		});
		console.log(api_result);
		Spice.add({
			id: 'trakt',
			name: 'TV',
			data: api_result,
			meta: {
				sourceName: "Trakt",
				sourceUrl: "http://trakt.tv/search/shows?q="+encodeURIComponent(query),
				itemType: 'TV Episodes'
			},
			templates: {
				group: 'media',
				detail: 'products_item_detail',
				options: {
					variant: 'video',
					buy: Spice.trakt_episode.buy,
					subtitle_content: Spice.trakt_episode.subtitle_content
				}
			},
			normalize: function(item){
				return {
					image: item.episode.images.screen || item.show.images.fanart,
					img: item.episode.images.fanart || item.episode.images.screen || item.episode.images.poster || item.show.images.fanart || item.show.images.poster,
					title: item.episode.title + " - " + item.show.title,
					heading: item.episode.title + "(" + item.show.title + ")",
					url: item.episode.url,
					abstract:  Handlebars.helpers.ellipsis(item.episode.overview, 200),
				};
			},
			relevancy: {
				skip_words: SKIP_ARRAY,
				dup: "title",
				primary: [{
					key: 'show.title',
					strict: true
				}, {
					key: 'show.images.poster',
					match: DEFAULT_IMAGE_REGEX,
					strict: false
				}, {
					key: 'show.images.fanart',
					match: DEFAULT_IMAGE_REGEX,
					strict: false
				}]
			},
			sort_fields: {
				rating: function(a, b) {
					return a.hotness < b.hotness ? 1 : -1;
				}
			},
			sort_default: "rating"
		});
	};
}(this));