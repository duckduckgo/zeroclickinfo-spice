(function (env) {
    "use strict";

    var movies = [
        {"movie":{"id":"20335","slug":"war-for-the-planet-of-the-apes","title":"War for the Planet of the Apes","poster_image_thumbnail":"http://image.tmdb.org/t/p/w154/y52mjaCLoJJzxfcDDlksKDngiDx.jpg"}},
        {"movie":{"id":"20437","slug":"une-vie","title":"A Woman's Life","poster_image_thumbnail":"http://image.tmdb.org/t/p/w154/waWWTDxKjSCmNAefMkM4uvQzdD0.jpg"}},
        {"movie":{"id":"28162","slug":"49a38d08-365e-4847-890c-99e4eb3ec0dd","title":"Jagga Jasoos","poster_image_thumbnail":"http://image.tmdb.org/t/p/w154/syKtt4o1qk8gzlovg0edQ93bFE2.jpg"}},
        {"movie":{"id":"20802","slug":"all-eyez-on-me","title":"All Eyez on Me","poster_image_thumbnail":"http://image.tmdb.org/t/p/w154/zmgsaKFWbmZ1Grz4SO0PLNxilv3.jpg"}},
        {"movie":{"id":"20606","slug":"baywatch","title":"Baywatch","poster_image_thumbnail":"http://image.tmdb.org/t/p/w154/6HE4xd8zloDqmjMZuhUCCw2UcY1.jpg"}},
        {"movie":{"id":"26272","slug":"beatriz-at-dinner","title":"Beatriz at Dinner","poster_image_thumbnail":"http://image.tmdb.org/t/p/w154/obOhjpLQ720cdJMdhprOLBMrJI1.jpg"}},
        {"movie":{"id":"25530","slug":"everything-everything","title":"Everything, Everything","poster_image_thumbnail":"http://image.tmdb.org/t/p/w154/c8W3Go48Mw0GoNXsGK4W9hNO4Vf.jpg"}},
    ]

    function get_movie_name(id) {
        for(var i = 0 ; i < movies.length ; i++) {
            if(id == movies[i].movie.id) {
                return movies[i].movie.title;
            }
        }
    }

    function get_movie_poster(id) {
        for(var i = 0 ; i < movies.length ; i++) {
            if(id == movies[i].movie.id) {
                console.log(movies[i].movie.poster_image_thumbnail);
                return movies[i].movie.poster_image_thumbnail;
            }
        }
    }

    env.ddg_spice_showtimes = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.showtimes > 5) {
            return Spice.failed('showtimes');
        }

        console.log(api_result.showtimes);
        api_result = api_result.showtimes;

        // Render the response
        Spice.add({
            id: 'showtimes',
            signal: 'high',

            // Customize these properties
            name: 'Showtimes',
            data: api_result,
            meta: {},
            normalize: function(item) {
                var title = get_movie_name(item.movie_id);
                var image = get_movie_poster(item.movie_id);
                return {
                    // customize as needed for your chosen template
                    title: title || item.movie_id,
                    image: image || "",
                    start_at: item.start_at
                };
            },
            templates: {
                item: Spice.showtimes.item,
                item_detail: Spice.showtimes.detail
            }
        });
    };
}(this));
