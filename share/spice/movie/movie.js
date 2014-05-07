(function(env) {
    "use strict";


    env.ddg_spice_movie = function(api_result) {

        if (!api_result) {
            return Spice.failed('movie');
        }

        Spice.add({
            id: 'movie',
            name: 'Movies',
            data: api_result.movies,
            meta: {
                sourceName: 'Rotten Tomatoes',
                sourceUrl: 'http://www.rottentomatoes.com/movie/in-theaters/',
                itemType: 'Movies'
            },
            normalize: function(item) {
		var position;
		if(item.ratings.critics_rating === "Fresh" || item.ratings.critics_rating === "Certified Fresh") {
		    position = "-256px -144px";
		} else if(item.ratings.critics_rating === "Rotten") {
		    position = "-272px -144px"; 
		}

                return {
                    rating: Math.max(item.ratings.critics_score / 20, 0),
                    image: item.posters.detailed,
		    icon_url: DDG.get_asset_path('movie','icons-v2.png'),
		    icon_image: position,
		    icon_class: position ? 'tomato--icon' : ""
                };
            },
            templates: {
		group: 'products_simple',
		wrap_detail: false,
		item_detail: false,
                detail: Spice.movie.detail,
                options: {
                    variant: 'poster'
                }
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

	// Make sure we hide the title and ratings.
	// It looks nice to show only the poster of the movie.
	Spice.getDOM('movie').find('.tile__body').hide();
    };

    // Convert minutes to hr. min. format.
    // e.g. {{time 90}} will return 1 hr. 30 min.
    Handlebars.registerHelper("movie_time", function(runtime) {
        var hours = '',
            minutes = runtime;

        if(runtime >= 60) {
            hours = Math.floor(runtime / 60) + ' hr. ';
            minutes = (runtime % 60);
        }

        return hours + (minutes > 0 ? minutes + ' min.' : '');
    });

}(this));
