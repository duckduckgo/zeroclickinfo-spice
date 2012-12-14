// `ddg_spice_movie` is a callback function that gets
// called when people search for movie titles. Example
// triggers are "pirates of the caribbean movie" or "indie game movie."


// This anonymous function is used to prevent helper
// functions from becoming global functions. We only expose
// `ddg_spice_movie` so we attach it to the variable `root`. 
(function(root) {
    "use strict";

    // This function is responsible for calling other functions that
    // process data and display the plugin.
    root.ddg_spice_movie = function(movie) {
        var collection = {};
        collection.request = DDG.get_query().replace("movie", "").replace("film", "");
        if (movie && movie.total > 0 && movie.movies) {
            var result = getRelevant(movie),
                synopsis = getSynopsis(result),
                names = getNames(result),
                poster = getPoster(result),
                header = getHeader(result),
                date = getDates(result),
                rating = getRating(result);

            collection = {
                result: result,
                synopsis: synopsis,
                names: names,
                poster: poster,
                header: header,
                date: date,
                rating: rating
            };

            display(collection);
        }
    };

    // Check for the most relevant movie. If we
    // only have one movie or if we didn't find a
    // more relevant movie, we get the first one.
    function getRelevant(movie) {
        var result,
            SKIP_ARRAY = {
                movie: 1,
                film: 1
            },
            aMovie;
        if (movie.total > 1) {
            result = movie.movies[0];
            for (var i = 0, length = movie.movies.length; i < length; i += 1){
                aMovie = movie.movies[i];
                if (DDG.isRelevant(aMovie.title, SKIP_ARRAY)) {
                    result = aMovie;
                    break;
                }
            }             
        } else {
            result = movie.movies[0];
        }
        return result;
    }

    // Checks if we have a synopsis. If we do,
    // we should trim it so that it fits in our
    // plugin.
    function getSynopsis(result) {
        var synopsis;
        if (result.synopsis) {
            synopsis = result.synopsis.substring(0, 135) + "...";
        } else if (result.critics_consensus && result.critics_consensus.length > 0) {
            synopsis = result.critics_consensus.substring(0, 135) + "...";
        } else {
            synopsis = '';
        }
        return synopsis;
    }

    // Get the abridged cast members from the result.
    function getNames(result) {
        var names = [],
            obj = {};
        for (var i = 0, length = result.abridged_cast.length; i < length; i += 1) {
            obj = {};
            obj.name = result.abridged_cast[i].name;
            obj.id = result.abridged_cast[i].id;
            names.push(obj);
        }
        return names;
    }

    // Get the poster from the results. If there isn't any,
    // use something else.
    function getPoster(result) {
        var poster = result.posters.thumbnail,
            default_image = 'http://images.rottentomatoescdn.com/images/redesign/poster_default.gif';
        if (poster === default_image) {
            poster = '';
        }
        return poster;
    }

    // Trim the headers.
    function getHeader(result) {
        var header = result.title.substring(0, 49);
        if (result.title.length > 50) {
            header += '...';
        }
        return header;
    }

    // Get the rating and the release date
    // from the result.
    function getDates(result) {
        var currentTime = new Date(),
            rDate, 
            opened,
            releaseDate;
        if (result.release_dates.theater) {
            rDate = result.release_dates.theater.split("-");
            opened = new Date(rDate[0], rDate[1] - 1, rDate[2], 0, 0, 0);
            releaseDate = (currentTime - opened < 0) ? opened.toDateString().slice(4) : result.year;
        } else if (result.year > currentTime.getFullYear()) {
            releaseDate = result.year;
        }
        return releaseDate;
    }

    // This function accepts an array of strings and 
    // it joins them using `delimiter` and `last`.
    function toSentence(strings, delimiter, last) {
        var result;
        if (delimiter === null || delimiter === undefined) {
            delimiter = ', ';
        }
        if (last === null || last === undefined) {
            last = 'and';
        }
        if (strings.length === 0) {
            return '';
        }
        result = strings.slice(0, -1);
        if (result.length === 0) {
            return strings[0];
        } else {
            return "" + (result.join(delimiter)) + delimiter + last + " " + strings.slice(result.length);
        }
    }

    // Check the rating.
    function getRating(result) {
        var adjective;
        if (result.mpaa_rating === "R" || 
                result.mpaa_rating === "NC-17" || result.mpaa_rating === "Unrated") {
            adjective = "an";
        } else {
            adjective = "a";
        }
        return [adjective, result.mpaa_rating];
    }

    // Use this function to create the HTML and call the `nra` function.
    function display(collection) {

        // This function creates links to the profile of an actor or actress.
        function castHTML(names) {
            var url,
                strings = [];
            for(var i = 0, length = names.length; i < length; i += 1) {
                url = 'http://www.rottentomatoes.com/celebrity/' + names[i].id + '/';
                strings.push('<a onlcick="fl=1" href="' + url + '">' + names[i].name + '</a>');
            }
            return toSentence(strings);
        }

        // Check the Tomatometer.
        function getTomato(result) {
            return (result.ratings.critics_rating) ? 
                result.ratings.critics_rating + ", " : "";
        }

        // Get the fraction of the critics who liked the movie.
        function getCriticsScore(result) {
            if(result.ratings.critics_score !== -1) {
                return result.ratings.critics_score + "% critics, ";
            } else {
                return "";
            }
        }

        // Get the fraction of the audience who liked the movie.
        function getAudienceScore(result) {
            if(result.ratings.audience_score !== -1) {
                return result.ratings.audience_score + "% audience";
            } else {
                return "";
            }
        }

        // Build the output.
        var output = collection.result.title + " (" + collection.result.year + ") is " + collection.rating[0] +
                     " " + collection.rating[1] + " movie (" + getTomato(collection.result) + getCriticsScore(collection.result) +
                     getAudienceScore(collection.result) + "), starring " + castHTML(collection.names) + ". " + collection.synopsis,
            items = [[]];

        items[0] = {
            a: output,
            h: collection.header + " (" + collection.date + ")",
            s: 'Rotten Tomatoes',
            u: collection.result.links.alternate,
            i: collection.poster
        };
        nra(items);
    }
}(this));

