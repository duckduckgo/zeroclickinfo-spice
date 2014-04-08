(function(env) {
    "use strict";

    env.ddg_spice_in_theaters = function(api_result) {
	// Exit if we don't find any movies or if we see an error.
	if(api_result.error || !api_result.movies || api_result.movies.length === 0) {
            return;
	}

	Spice.add({
	    id: 'in_theaters',
	    name: 'Now Showing',
	    data: api_result.movies,
	    meta: {
		sourceName: 'Rotten Tomatoes',
		sourceUrl: 'http://www.rottentomatoes.com/movie/in-theaters/',
		sourceIcon: true,
		total: api_result.movies,
		itemType: 'Now Showing'
	    },
	    normalize: function(o) {
		// The critic's score ranges from 0 to 100, but the helper function starRating
		// expects a range between 0 to 5.
		o.ratings.normalized = o.ratings.critics_score >= 0 ? o.ratings.critics_score / 20 : 0;
		o.ratings.runtime = o.ratings.runtime >= 0 ? o.ratings.runtime : 0;

		return o;
	    },
	    templates: {
		item: Spice.in_theaters.in_theaters,
		detail: Spice.in_theaters.in_theaters_detail
	    }
	});
    }

    // Convert minutes to hr. min. format.
    // e.g. {{time 90}} will return 1 hr. 30 min.
    Handlebars.registerHelper("time", function(runtime) {
	var hour = 0,
            minute = 0;

	if(runtime) {
            if(runtime >= 60) {
		hour = Math.floor(runtime / 60);
		minute = runtime - (hour * 60);
            } else {
		minute = runtime;
            }
            hour = hour + ' hr ';
            minute += ' min';
            return hour + minute;
	}
    });
}(this));
