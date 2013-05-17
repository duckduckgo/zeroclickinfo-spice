var ddg_spice_in_theaters = function(api_result) {

    // Exit if we don't find any movies or if we see an error.
    if(api_result.error || !api_result.movies || api_result.movies.length === 0) {
        return;
    }

    // Get the original query.
    // We're going to pass this to the header.
    var matched, result, query = "";
    $("script").each(function() {
        matched = $(this).attr("src");
        if(matched) {
            result = matched.match(/\/js\/spice\/in_theaters\/([^\/]+)/);
            if(result) {
                query = result[1];
            }
        }
    });

    var header = "";
    if(query === "opening") {
        header = "Opening Movies";
    } else {
        header = "Currently in Theaters";
    }

    var image_proxy = "/iu/?u=";
    Spice.render({
        data             : api_result,
        header1          : header,
        source_url       : "http://www.rottentomatoes.com/",
        // The initial poster is set by the first movie.
        image_url        : image_proxy + api_result.movies[0].posters.thumbnail,
        source_name      : "Rotten Tomatoes",
        template_normal  : "in_theaters",
        force_big_header : true
    });

};

// Convert minutes to hr. min. format.
// e.g. {{time 90}} will return 1 hr. 30 min.
Handlebars.registerHelper("time", function(runtime) {
    var hour = 0,
        minute = 0;

    if(runtime) {
        if(runtime >= 60) {
            hour = Math.floor(runtime / 60);
            minute = runtime - (hour * 60);
        } else {
            minute = runtime;
        }
        hour = hour + 'hr. ';
        minute += 'min.';
        return hour + minute;
    }
});

// Guarantee that we're only going to show five movies.
Handlebars.registerHelper("list", function(items, options) {
    var out = "";
    for(var i = 0; i < items.length && i < 5; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});