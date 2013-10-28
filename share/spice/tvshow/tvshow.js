function ddg_spice_tvshow(api_result) {
    "use strict";
    if(!api_result.results || api_result.results.length === 0)
        return;
    Spice.render({
        data                     : api_result,
        source_url      		 : 'http://www.themoviedb.org/',
        source_name     		 : 'TheMovieDB',
        spice_name      		 : 'tvshow',
        template_frame           : "carousel",
        template_options         : {
            items                : api_result.results,
            template_item        : "tvshow"
        },
    });
}

Handlebars.registerHelper("pretty_release_date", function() {
    "use strict";
    var meta = {
        day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
        default:
            postfix = "th";
    }
    return meta.day[date.getDay()] + " " + date.getDate() + postfix + " " + meta.month[date.getMonth()] + " " + date.getFullYear();
});