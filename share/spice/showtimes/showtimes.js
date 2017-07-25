(function (env) {
    "use strict";

    /**
     * MOVIES + CINEMAS
     */

    var movies = {};
    var cinemas = {};

    function create_movie_index(api_result) {
        for (var i = 0; i < api_result["movies"].length; i++) {
            movies[api_result.movies[i]["id"]] = api_result.movies[i];
        }
    }

    function create_cinema_index(api_result) {
        for (var i = 0; i < api_result["cinemas"].length; i++) {
            cinemas[api_result.cinemas[i]["id"]] = api_result.cinemas[i];
        }
    }

    /**
     * SHOWTIMES
     */

    var showtimes = {};

    function aggregate_showtimes(api_result) {

        // create all the keys
        for(var i = 0; i < api_result["showtimes"].length; i++) {
            showtimes[api_result["showtimes"][i].movie_id] = []
        }

        // add info to the keys
        for(var i = 0; i < api_result["showtimes"].length; i++) {
            showtimes[api_result["showtimes"][i].movie_id].push(api_result["showtimes"][i])
        }
    }

    function normalize_response(showtimes_obj) {
        var artificial_result = []; // the array we're passing to Spice.normalize()

        var showtime_keys = Object.keys(showtimes_obj);
        var cinema_keys = Object.keys(cinemas);

        for (var i = 0; i < showtime_keys.length; i++) {
            var tmp_obj = {};

            tmp_obj["title"] = movies[showtime_keys[i]].title;
            tmp_obj["image"] = movies[showtime_keys[i]].poster_image_thumbnail;
            tmp_obj["genres"] = movies[showtime_keys[i]].genres;
            tmp_obj["showtimes"] = showtimes_obj[showtime_keys[i]];


            for(var j = 0; j < showtimes_obj[showtime_keys[i]].length; j++) {
                var cinema_id = showtimes_obj[showtime_keys[i]][j].cinema_id;
                var cinema_name = cinemas[cinema_id].name;
                showtimes_obj[showtime_keys[i]][j]["cinema_name"] = cinema_name;

                var date = moment(showtimes_obj[showtime_keys[i]][j].start_at).format("DD/MMM/YYYY");
                showtimes_obj[showtime_keys[i]][j]["date"] = date;
                var time = moment(showtimes_obj[showtime_keys[i]][j].start_at).format("HH:mm");
                showtimes_obj[showtime_keys[i]][j]["time"] = time;
            }

            artificial_result.push(tmp_obj);
        }

        return artificial_result;
    }

    env.ddg_spice_showtimes = function(api_result) {

        if (!api_result || api_result.error) {
            return Spice.failed('showtimes');
        }

        DDG.require('moment.js', function(){

            // preprocess the json response
            create_movie_index(api_result);
            create_cinema_index(api_result);
            aggregate_showtimes(api_result);
            var showtime_results = normalize_response(showtimes);

            // Render the response
            Spice.add({
                id: 'showtimes',

                // Customize these properties
                name: 'Showtimes',
                data: showtime_results,
                meta: {},
                normalize: function(item) {
                    return {
                        title: item.title,
                        primary_genre: item.genres[0].name,
                        image: item.image,
                        showtimes: item.showtimes
                    };
                },
                templates: {
                    item: Spice.showtimes.item,
                    item_detail: Spice.showtimes.detail
                },
                sort_fields: {
                    showtimes: function(a, b) {
                        if (a.length < b.length) {
                            return -1;
                        }
                        if (a.length > b.length) {
                            return 1;
                        }
                        return 0;
                    }
                },
                sort_default: 'showtimes',
            });

        });
    };
}(this));
