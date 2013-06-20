function ddg_spice_movie (api_result) {
    "use strict";

    if (api_result.total === 0) {
        return;
    }

    var ignore = ["movie", "film", "rotten", "rating", "rt", "tomatoes", "release date"];
    var result, max_score = 0;

    // Assign a ranking value for the movie. This isn't a complete sorting value though
    // also we are blindling assuming these values exist
    var score = function(m) {
        var s = m.ratings.critics_score * m.ratings.audience_score;
        if (s > max_score) max_score = s;
        // If any above are undefined, s is undefined.
        return s;
    };

    // returns the more relevant of the two movies
    var better = function(currentbest, next) {
        // If score() returns undefined, this is false, so we're still OK.
        return (score(next) > score(currentbest) &&
                (next.year < currentbest.year) &&
                DDG.isRelevant(next.title, ignore)) ? next : currentbest;
    };

    result = DDG_bestResult(api_result.movies, better);

    // Favor the first result if the max score is within 1% of the score for the first result.
    if (result !== api_result.movies[0] && Math.abs(score(api_result.movies[0]) - max_score) / max_score < 0.1) {
        result = api_result.movies[0];
    }

    // Check if the movie that we have is relevant enough.
    if(!DDG.isRelevant(result.title, ignore)) {
        return;
    }

    var checkYear = function(year) {
        if(year) {
            return " (" + year + ")";
        }
        return "";
    };

    if ((result.synopsis && result.synopsis.length) ||
        (result.critics_consensus && result.critics_consensus.length)) {
        result.hasContent = true;
    }

    Spice.render({
        data: result,
        source_name: 'Rotten Tomatoes',
        template_normal: "movie",
        template_small: "movie_small",
        force_no_fold: 1,
        source_url: result.links.alternate,
        header1: result.title + checkYear(result.year),
        image_url: result.posters.thumbnail.indexOf("poster_default.gif") === -1 ? result.posters.thumbnail : ""
    });
}

/*
 * rating_adjective
 *
 * help make the description of the movie gramatically correct
 * used in reference to the rating of the movie, as in
 *   'an' R rated movie, or
 *   'a'  PG rated movie
 */
Handlebars.registerHelper("rating_adjective", function() {
    "use strict";

    return (this.mpaa_rating === "R" ||
            this.mpaa_rating === "NC-17" ||
            this.mpaa_rating === "Unrated") ?  "an" :"a";
});

/* star rating */
Handlebars.registerHelper("star_rating", function(score) {
    "use strict";

    var r = (score / 20) - 1;
    var s = "";

    if (r > 0) {
        for (var i = 0; i < r; i++) {
            s += "&#9733;";
        }
    }

    if (s.length === 0) {
        s = "0 Stars";
    }

    return s;
});