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

    // Guarantee that we're only going to show five movies.
    Handlebars.registerHelper("list", function(items, options) {
	var out = "";
	for(var i = 0; i < items.length && i < 5; i += 1) {
            out += options.fn(items[i]);
	}
	return out;
    });

    Handlebars.registerHelper("star_rating", function(score) {
        var r = (score / 20) - 1,
        s = "";
	
        if (r > 0) {
            for (var i = 0; i < r; i++) {
                s += "&#9733;";
            }
        }

        if (s.length === 0) {
            s = "";
        }
	
        return s;
    });

    Handlebars.registerHelper("checkRating", function(critics_rating) {
	return critics_rating || "";
    });

    Handlebars.registerHelper("checkScore", function(critics_score) {
	if(critics_score === -1) {
            return "";
	}
	return ": " + critics_score + "%";
    });
}(this));

