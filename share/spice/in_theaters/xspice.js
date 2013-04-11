var ddg_spice_in_theaters = function(api_result) {
    if(api_result.error || !api_result.movies || api_result.movies.length === 0) {
        return;
    }

    Spice.render({
        data             : api_result,
        header1          : "Currently In Theaters",
        source_url       : "http://www.rottentomatoes.com/",
        image_url        : api_result.movies[0].posters.thumbnail,
        source_name      : "Rotten Tomatoes",
        template_normal  : "in_theaters",
        force_big_header : true
    });

    $(".movie").each(function() {
        $(this).on("hover", function() {
            $("#zero_click_image img").attr("src", $(this).attr("data-image"));
        });
    });
};

Handlebars.registerHelper("time", function(runtime) {
    if(runtime) {
        var hour = 0;
        var minute = 0;
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

Handlebars.registerHelper("list", function(items, options) {
    var out = "";

    for(var i = 0; i < items.length && i < 5; i += 1) {
        out += options.fn(items[i]);
    }

    return out;
});