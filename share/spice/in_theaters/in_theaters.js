(function(env) {
    "use strict";

    env.ddg_spice_in_theaters = function(api_result) {

        if (!api_result || api_result.error) {
            return Spice.failed('in_theaters');
        }

        Spice.add({
            id: 'in_theaters',
            name: 'Now Showing',
            data: api_result.movies,
	    signal: 'high',
            meta: {
                sourceName: 'Rotten Tomatoes',
                sourceUrl: 'http://www.rottentomatoes.com/movie/in-theaters/',
                total: api_result.movies,
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
                    rating: item.ratings.critics_score >= 0 ? item.ratings.critics_score / 20 : 0,
                    image: item.posters.detailed,
		    icon_url: DDG.get_asset_path('in_theaters','icons-v2.png'),
		    icon_image: position,
		    icon_class: position ? 'tomato--icon' : ""
                };
            },
            templates: {
		group: 'products_simple',
                wrap_detail: false,
		item_detail: false,
                detail: Spice.in_theaters.detail,
                options: {
                    variant: 'poster'
                }
            }
        });

        Spice.getDOM('in_theaters').find('.tile__body').addClass('is-hidden');
    }

    // Convert minutes to hr. min. format.
    // e.g. {{time 90}} will return 1 hr. 30 min.
    Handlebars.registerHelper("InTheaters_time", function(runtime) {
        var hours = '',
            minutes = runtime;

        if(runtime >= 60) {
            hours = Math.floor(runtime / 60) + ' hr. ';
            minutes = (runtime % 60);
        }

        return hours + (minutes > 0 ? minutes + ' min.' : '');
    });
}(this));
