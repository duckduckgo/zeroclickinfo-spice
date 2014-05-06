(function(env) {
    "use strict";

    env.ddg_spice_in_theaters = function(api_result) {

        if(api_result.error) {
            return;
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
                return { 
                    rating: item.ratings.critics_score >= 0 ? item.ratings.critics_score / 20 : 0,
                    image: item.posters.detailed
                };
            },
            templates: {
                item: 'basic_image_item',
                detail: Spice.in_theaters.in_theaters_detail,
                options: {
                    tileClass: 'tile--b--i--mov  tile--c--n'
                }
            }
        });

        Spice.getDOM('in_theaters').find('.tile__body').addClass('is-hidden');
    }

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
