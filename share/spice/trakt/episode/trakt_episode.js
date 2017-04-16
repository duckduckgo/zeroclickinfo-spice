(function(env){
	"use strict";
	// Get the sign of the number - 0 if it is zero, -1 if it is below zero and 1 if it is above zero
	function sign(num) {
		return (num > 0) - (num < 0);
	}
	env.ddg_spice_trakt_episode = function(api_result) {
		if (!api_result || api_result.length === 0) {
			return Spice.failed('trakt');
		}
		var SKIP_REGEX = / *(tv|episode|on) */g,
			DEFAULT_IMAGE_REGEX = /^(?!.*http:\/\/slurm.trakt.us\/images\/(poster-dark|fanart-dark|banner)\.jpg).*$/,
			SKIP_ARRAY = ["tv", "episode"],
			query = DDG.get_query().replace(SKIP_REGEX, ""),
			isMobile = $('.is-mobile').length;

		api_result = api_result.slice(0, 12);

		$.each(api_result, function(ind, item) {
			var s = item.episode.ratings.loved - item.episode.ratings.hated;
			var order = Math.log(Math.max(Math.abs(s), 1)) / Math.LN10;
			var signed = sign(s);
			item.hotness = signed * order;
		});
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
					heading: item.episode.title + " (" + item.show.title.split("(")[0] + ")",
					url: item.episode.url,
					abstract:  Handlebars.helpers.ellipsis(item.episode.overview, isMobile ? 175 : 500)
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
	// Return the full name of this episode
	Handlebars.registerHelper('full_name', function(season, episode) {
		if(season === 0) {
			return "Special " + episode;
		} else {
			return "Season " + season + ", Episode " + episode;
		}
	});
}(this));