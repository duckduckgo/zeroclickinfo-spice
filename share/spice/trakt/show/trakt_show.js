(function(env){
	"use strict";
	// Get the sign of the number - 0 if it is zero, -1 if it is below zero and 1 if it is above zero
	function sign(num) {
		return (num > 0) - (num < 0);
	}
	env.ddg_spice_trakt_show = function(api_result) {
		if (!api_result || api_result.length === 0) {
			return Spice.failed('trakt');
		}
		var SKIP_REGEX = / *(tv|show) */g,
			DEFAULT_IMAGE_REGEX = /^(?!.*http:\/\/slurm.trakt.us\/images\/(poster-dark|fanart-dark|banner)\.jpg).*$/,
			SKIP_ARRAY = ["tv", "show"],
			query = DDG.get_query().replace(SKIP_REGEX, ""),
			isMobile = $('.is-mobile').length;

		api_result = api_result.slice(0, 12);
		
		$.each(api_result, function(ind, item) {
			var s = item.ratings.loved - item.ratings.hated;
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
				itemType: 'TV Shows'
			},
			templates: {
				group: 'media',
				detail: 'products_item_detail',
				options: {
					variant: 'poster',
					buy: Spice.trakt_show.buy,
					subtitle_content: Spice.trakt_show.subtitle_content
				}
			},
			normalize: function(item){
				return {
					image: item.images.poster,
					img: item.images.fanart || item.images.poster,
					title: item.title,
					heading: item.title + " (" + item.year + ")",
					url: item.url,
					abstract:  Handlebars.helpers.ellipsis(item.overview, isMobile ? 175 : 500)
				};
			},
			relevancy: {
				skip_words: SKIP_ARRAY,
				dup: "title",
				primary: [{
					key: 'title',
					strict: true
				}, {
					key: 'images.poster',
					match: DEFAULT_IMAGE_REGEX,
					strict: false
				}, {
					key: 'images.fanart',
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
		// Make sure we hide the title and ratings.
		// It looks nice to show only the poster of the movie.
		Spice.getDOM('trakt').find('.tile__body').hide();
	};
	
	// Convert minutes to hr. min. format.
	// e.g. {{time 90}} will return 1 hr. 30 min.
	Handlebars.registerHelper("time", function(runtime) {
		var hours = '',
			minutes = runtime;
		if(runtime >= 60) {
			hours = Math.floor(runtime / 60) + ' hr. ';
			minutes = (runtime % 60);
		}
		return hours + (minutes > 0 ? minutes + ' min.' : '');
	});
	Handlebars.registerHelper("is_daily", function() {
		return this.air_day.toLowerCase() == "daily";
	});
}(this));