function ddg_spice_movie_release_date (result) {
    "use strict";
    if(!result.results || result.results.length === 0)
        return;
    var data = result.results[0];
    Spice.render({
        data             : data,
        header1          : data.title + " release date",
        source_url       : 'http://www.themoviedb.org/movie/' + data.id,
        source_name      : 'TheMovieDB',
        spice_name       : 'movie_release_date',
        force_big_header : true
    });
}

Handlebars.registerHelper("pretty_release_date", function() {
    "use strict";
    var parts = this.release_date.split("-");
    var date = new Date(parts[0], parts[1], parts[2]);
    return date.toDateString();
});