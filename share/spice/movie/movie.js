(function(env) {
    "use strict";


    env.ddg_spice_movie = function(api_result) {

        if (!api_result) {
            return Spice.failed('movie');
        }

	// Get original query.
        var script = $('[src*="/js/spice/movie/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/movie\/([^\/]+)/)[1];

        Spice.add({
            id: 'movie',
            name: 'Movies',
            data: api_result.movies,
            meta: {
                sourceName: 'Rotten Tomatoes',
                sourceUrl: 'https://www.rottentomatoes.com/search/?search=' + query,
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
		    icon_class: position ? 'tomato--icon' : "",
		    abstract: Handlebars.helpers.ellipsis(item.synopsis, 200),
		    heading: item.title,
		    img_m: item.posters.detailed,
		    url: item.links.alternate
                };
            },
            templates: {
		group: 'products_simple',
                options: {
                    variant: 'poster',
		    subtitle_content: Spice.movie.subtitle_content,
		    rating: true,
		    buy: Spice.movie.buy
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
    Handlebars.registerHelper("time", function(runtime) {
        var hours = '',
            minutes = runtime;

        if(runtime >= 60) {
            hours = Math.floor(runtime / 60) + ' hr. ';
            minutes = (runtime % 60);
        }

        return hours + (minutes > 0 ? minutes + ' min.' : '');
    });
}(this));
