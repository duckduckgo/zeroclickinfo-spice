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
            collection.result = getRelevant(movie);            
            collection.synopsis = getSynopsis(collection.result);
            collection.names = getNames(collection.result);
            collection.poster = getPoster(collection.result);
            collection.header = getHeader(collection.result);

            var dates = getDates(collection.result);
            collection.rating = dates[0];
            collection.releaseDate = dates[1];
            
            collection.reaction = getReaction(collection.rating);
            collection.audience = getAudience(collection.result, collection.reaction);
            collection.critics = getCritics(collection.result, 
                                    collection.audience, collection.reaction);
            collection.tomato = getTomato(collection.result);
            collection.rating = getRating(collection.result, collection.rating);

            display(collection);
        }
    };

    function getTomato(result) {
        return (result.ratings.critics_rating) ? result.ratings.critics_rating + ", " : "";
    }

    // Check the rating.
    function getRating(result, rating) {
        if (!rating) {
            if (result.mpaa_rating === "R" || result.mpaa_rating === "NC-17" || result.mpaa_rating === "Unrated") {
                rating = "an ";
            } else {
                rating = "a ";
            }
        }
        rating += result.mpaa_rating;
        return rating;
    }

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
        var header = result.title.substring(0,49);
        if (result.title.length > 50) {
            header += '...';
        }
        return header;
    }

    // Get the rating and the release date
    // from the result.
    function getDates(result) {
        var currentTime = new Date(),
            rDate, opened,
            rating, releaseDate;
        if (result.release_dates.theater) {
            rDate = result.release_dates.theater.split("-");
            opened = new Date(rDate[0], rDate[1]-1, rDate[2], 0, 0, 0);
            rating = (currentTime - opened < 0) ? "an upcoming " : "";
            releaseDate = (rating) ? opened.toDateString().slice(4) : result.year;
        } else if (result.year > currentTime.getFullYear()) {
            rating = "an upcoming ";
            releaseDate = result.year;
        }
        return [rating, releaseDate];
    }

    // Get the reaction of the movie.
    function getReaction(rating) {
        return (rating) ? " want to see)" : " approved)";
    }

    // Get the audience score of the movie.
    function getAudience(result, reaction) {
        return (result.ratings.audience_score === -1) ? "" : 
            result.ratings.audience_score + "% audience" + reaction;
    }

    // Get the critic's score of the movie.
    function getCritics(result, audience, reaction) {
        var critics = (result.ratings.critics_score === -1) ? "" : 
            result.ratings.critics_score + "% critics, ";
        critics += (audience) ? "" : reaction;
        return critics;
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
            return ', starring ' + toSentence(strings);
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

        var items = [[]];
        items[0] = {
            a: collection.result.title + ' (' + collection.result.year + ') is ' +
               collection.rating + ' movie (' + collection.tomato + collection.critics +
               collection.audience + castHTML(collection.names) + '. ' + collection.synopsis,
            h: collection.header + " (" + collection.releaseDate + ")",
            s: 'Rotten Tomatoes',
            u: collection.result.links.alternate,
            i: collection.poster
        };
        nra(items);
    }
}(this));

