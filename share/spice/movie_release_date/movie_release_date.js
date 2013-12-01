function ddg_spice_movie_release_date (api_result) {
    "use strict";
    if(!api_result || api_result.results === null || api_result.results.length == 0 || api_result.total_results == 0)
        return;
    var ignore = ["release", "date", "premiere", "of", "for", "when", "will", "did", "come", "out", "air"];
    var movies = api_result.results;
    movies.filter(function(movie) {
		return movie.release_date !== null && movie.release_date.length > 0 && movie.release_date.split("-").length === 3 && (DDG.isRelevant(movie.title, ignore) || DDG.isRelevant(movie.original_title, ignore));
	});
	function movie_score(movie) {
		return movie.relevance * 2 + movie.vote_average * 0.5 + movie.popularity * 0.06;
	}
	for(var i = 0; i < movies.length; i++) {
		movies[i].relevance = movies.length - i;
		movies[i].score = movie_score(movies[i]);
		console.log("Score of "+movies[i].title+" = "+movies[i].score);
	}
	var movie = DDG_bestResult(movies, function(a, b) {
		return movie_score(a) > movie_score(b) ? a : b;
	});
    Spice.render({
        data             : movie,
        header1          : movie.title + " (Release Date)",
        source_url       : 'http://www.themoviedb.org/movie/' + movie.id,
        source_name      : 'TheMovieDB',
        spice_name       : 'movie_release_date'
    });
}
Handlebars.registerHelper("pretty_release_date", function() {
    "use strict";
    var meta = {
        day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
    var date = DDG.getDateFromString(this.release_date);
    return meta.day[date.getDay()] + " " + DDG.getOrdinal(date.getDate()) + " " + meta.month[date.getMonth()] + " " + date.getFullYear();
});
