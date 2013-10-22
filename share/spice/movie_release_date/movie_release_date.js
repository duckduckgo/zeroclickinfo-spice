var ddg_spice_movie_release_date_date_meta = {
    day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    month: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
}
function ddg_spice_movie_release_date (result) {
    "use strict";
    if(!result.results || result.results.length === 0)
        return;
    var query = DDG.get_query().replace(/(release|air|date|for|of|premiere|date)/, "");
    console.log(query);
    var data = null;
    for(var i=0; i < result.results.length; i++) {
        var curr = result.results[i];
        if(curr.release_date && DDG.isRelevant(curr.original_title, ["release", "date", "premiere", "of", "for"])) {
            data = curr;
            console.log(data);
            break;
        }
    }
    if(data == null)
        return;
    Spice.render({
        data             : data,
        header1          : data.title + " (Release Date)",
        source_url       : 'http://www.themoviedb.org/movie/' + data.id,
        source_name      : 'TheMovieDB',
        spice_name       : 'movie_release_date'
    });
}

Handlebars.registerHelper("pretty_release_date", function() {
    "use strict";
    var meta = ddg_spice_movie_release_date_date_meta;
    var parts = this.release_date.split("-");
    var date = new Date(parts[0], parts[1], parts[2]);
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
        default:
            postfix = "th";
    }
    return meta.day[date.getDay()] + " " + date.getDate() + postfix + " " + meta.month[date.getMonth()] + " " + date.getFullYear();
});