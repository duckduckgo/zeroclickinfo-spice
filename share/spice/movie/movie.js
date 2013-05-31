/*
 *  rotten tomatoes for spice 2
 *
 */
var ddg_spice_movie = function(api_result) {

  if (api_result.total === 0) return;

	Spice.render({
            data: api_result,
            source_name: 'Rotten Tomatoes',
            template_normal: "movie_alt",
            template_small: "movie_small",
						force_no_fold: 1
            // source_url, image_url, header set in relevantMovie helper function below
        });
};

/*
 * relevantMovie
 *
 * a block helper that finds the best movie and applies
 * it to the enclosed template block.
 *
 * Sets the source_url, image_url, and header1 for the template
 * based on the best movie.
 *
 */
Handlebars.registerHelper("relevantMovie", function(options) {
    var ignore = ["movie", "film", "rotten", "rating", "rt", "tomatoes"];
    var result, max_score = 0;

    // assign a ranking value for the movie. this isn't a complete sorting value though
    // also we are blindling assuming these values exist
    var score = function(m) {
        var s = m.ratings.critics_score * m.ratings.audience_score;
        if (s > max_score) max_score = s;
        return s; // if any above are undefined, s is undefined
    };

    // returns the more relevant of the two movies
    var better = function(currentbest, next) {
        return (score(next) > score(currentbest) // if score() returns undefined, this is false, so we're still ok
                    && (next.year < currentbest.year)
                    && DDG.isRelevant(next.title, ignore)) ?
                next : currentbest;
    };

    result = DDG_bestResult(this.movies, better);

    // favor the first result if the max score is within 1% of the score for the first result
    if (result !== this.movies[0] && Math.abs(score(this.movies[0]) - max_score) / max_score < 0.1) {
        result = this.movies[0];
    }

    // make the movie's info available to the zero click template
    // by setting spice value in the ddh (duckduckhack) object

    var checkYear = function(year) {
        if(year) {
            return " (" + result.year + ")";
        }
        return "";
    };

    // this.ddh.relevantMovie = result;
    this.ddh.source_url = result.links.alternate;
    this.ddh.image_url = (result.posters.thumbnail || 'http://images.rottentomatoescdn.com/images/redesign/poster_default.gif');
    this.ddh.header1 = result.title + checkYear(result.year);

    // invoke the body of the block with the relevant movie as the context
    return options.fn(result);
});


/*
 * rating_adjective
 *
 * help make the description of the movie gramatically correct
 * used in reference to the rating of the movie, as in
 *   'an' R rated movie, or
 *   'a'  PG rated movie
 */
Handlebars.registerHelper("rating_adjective", function() {
        return (this.mpaa_rating === "R"
             || this.mpaa_rating === "NC-17"
             || this.mpaa_rating === "Unrated") ?  "an" :"a";
});


/* star rating */
Handlebars.registerHelper("star_rating", function(score) {
        var r = (score / 20) - 1;
        var s = "";

        if (r > 0) {
            for (var i = 0; i < r; i++) {
                s += "&#9733;";
            }
        }

        if (s.length == 0) {
            s = "(0)";
        }

        return s;
});

