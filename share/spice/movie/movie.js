(function(env) {
    "use strict";

    env.ddg_spice_movie = function(api_result) {
	console.log(api_result);
	Spice.add({
	    id: 'movie',
	    name: 'Movies',
	    data: api_result.movies,
	    meta: {
		sourceName: 'Rotten Tomatoes',
		sourceUrl: 'http://www.rottentomatoes.com/movie/in-theaters/',
		sourceIcon: true,
		itemType: 'movies'
	    },
	    normalize: function(o) {
		return {
		    rating: o.ratings.critics_score >= 0 ? o.ratings.critics_score / 20 : 0,
		    image: o.posters.detailed
		};
	    },
	    templates: {
		item: 'basic_image_item',
		detail: Spice.movie.movie_detail
	    },
	    relevancy: {
		skip_words: [
		    'movie',
		    'info',
		    'film',
		    'rt',
		    'rotten',
		    'tomatoes',
		    'rating',
		    'ratings',
		    'rotten'
		],
		primary: [
		    { key: 'title' },
		    { key: 'posters.detailed', match: /_det\.jpg$/, strict: false }
		]
	    }
	});

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
    };
}(this));

// function ddg_spice_movie (api_result) {
//     "use strict";

//     if (api_result.total === 0) {
//         return;
//     }

//     var ignore = ["movie", "film", "rotten", "rating", "rt", "tomatoes", "release date"];
//     var result, max_score = 0;

//     // Assign a ranking value for the movie. This isn't a complete sorting value though
//     // also we are blindling assuming these values exist
//     var score = function(m) {
//         var s = m.ratings.critics_score * m.ratings.audience_score;
//         if (s > max_score) max_score = s;
//         // If any above are undefined, s is undefined.
//         return s;
//     };

//     // returns the more relevant of the two movies
//     var better = function(currentbest, next) {
//         // If score() returns undefined, this is false, so we're still OK.
//         return (score(next) > score(currentbest) &&
//                 (next.year > currentbest.year) &&
//                 DDG.isRelevant(next.title, ignore)) ? next : currentbest;
//     };

//     result = DDG_bestResult(api_result.movies, better);

//     // Favor the first result if the max score is within 1% of the score for the first result.
//     if (result !== api_result.movies[0] && Math.abs(score(api_result.movies[0]) - max_score) / max_score < 0.1) {
//         result = api_result.movies[0];
//     }

//     // Check if the movie that we have is relevant enough.
//     if(!DDG.isRelevant(result.title, ignore)) {
//         return;
//     }

//     var checkYear = function(year) {
//         if(year) {
//             return " (" + year + ")";
//         }
//         return "";
//     };

//     if ((result.synopsis && result.synopsis.length) ||
//         (result.critics_consensus && result.critics_consensus.length)) {
//         result.hasContent = true;
//     }

//     var data = api_result.movies.map(function(m){
//         m.rating = Math.round(m.ratings.critics_score / 20);
//         return m;
//     });

//     var searchTerm = rqd.replace(new RegExp(ignore.join('|'),'i'),'').trim();

//     Spice.add({
//         id: 'movie',
//         name: 'Movies',

//         data: data,

//         meta: {
//             sourceName: 'Rotten Tomatoes',
//             sourceUrl: 'http://rottentomatoes.com/search/?search=' + searchTerm,
//             sourceIcon: true,
//             count: api_result.movies.length,
//             itemType: 'Movies'
//         },

//         templates: {
//             item: 'movie_item',
//         }
//     });
// }

// /*
//  * rating_adjective
//  *
//  * help make the description of the movie gramatically correct
//  * used in reference to the rating of the movie, as in
//  *   'an' R rated movie, or
//  *   'a'  PG rated movie
//  */
// Handlebars.registerHelper("rating_adjective", function() {
//     "use strict";

//     return (this.mpaa_rating === "R" ||
//             this.mpaa_rating === "NC-17" ||
//             this.mpaa_rating === "Unrated") ?  "an" :"a";
// });

// /* star rating */
// Handlebars.registerHelper("star_rating", function(score) {
//     "use strict";

//     var r = (score / 20) - 1;
//     var s = "";

//     if (r > 0) {
//         for (var i = 0; i < r; i++) {
//             s += "&#9733;";
//         }
//     }

//     if (s.length === 0) {
//         s = "0 Stars";
//     }

//     return s;
// });

