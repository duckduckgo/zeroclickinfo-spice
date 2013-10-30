function ddg_spice_movie_release_date (api_result) {
    "use strict";
    if(api_result.results == null || api_result.results.length == 0 || api_result.total_results == 0)
        return;
    var data = null;
    var ignore = ["release", "date", "premiere", "of", "for", "when", "will", "did", "come", "out", "air"];
    for(var i=0; i < api_result.results.length; i++) {
        var curr = api_result.results[i];
        if(curr.release_date != null && DDG.isRelevant(curr.original_title, ignore, 4, true)) {
            data = curr;
            break;
        }
    }
    if(data == null)
        return;
    Spice.render({
        data             : data,
        header1          : data.title + " (USA Release Date)",
        image_url        : data.poster_path || data.backdrop_path ? "https://d3gtl9l2a4fn1j.cloudfront.net/t/p/w92"+(data.poster_path || data.backdrop_path) : null,
        source_url       : 'http://www.themoviedb.org/movie/' + data.id,
        source_name      : 'TheMovieDB',
        spice_name       : 'movie_release_date'
    });
}

Handlebars.registerHelper("pretty_release_date", function() {
    "use strict";
    if(this.release_date == null)
        return null;
    var meta = {
        day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };
    var parts = this.release_date.split("-");
    var date = new Date(parts[0], parts[1] - 1, parts[2]);
    var postfix_info = date.getDate() % 10;
    var postfix;
    switch(postfix_info) {
        case 1:
            postfix = "st";
            break;
        case 2:
            postfix = "nd";
            break;
        case 3:
            postfix = "rd";
            break;
        default:
            postfix = "th";
    }
    if(date.getDate() > 10 && date.getDate() < 20)
        postfix = "th";
    return meta.day[date.getDay()] + " " + date.getDate() + postfix + " " + meta.month[date.getMonth()] + " " + date.getFullYear();
});
