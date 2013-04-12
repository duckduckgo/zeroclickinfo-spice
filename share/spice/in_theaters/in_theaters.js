var ddg_spice_in_theaters = function(api_result) {

    // Exit if we don't find any movies or if we see an error.
    if(api_result.error || !api_result.movies || api_result.movies.length === 0) {
        return;
    }

    var image_proxy = "/iu/?u=";
    Spice.render({
        data             : api_result,
        header1          : "Currently In Theaters",
        source_url       : "http://www.rottentomatoes.com/",
        // The initial poster is set by the first movie.
        image_url        : image_proxy + api_result.movies[0].posters.thumbnail,
        source_name      : "Rotten Tomatoes",
        template_normal  : "in_theaters",
        force_big_header : true
    });

    // Get the size of the screen.
    // If the screen is small, don't display the image.
    var zero_click_image = $("#zero_click_image");
    var checkWidth = function(width) {
        if(width < 750) {
            zero_click_image.addClass("hide");
        } else {
            zero_click_image.removeClass("hide");
        }
    };

    // Monitor the size of the window.
    checkWidth($(window).width());
    $(window).resize(function() {
        checkWidth($(window).width());
    });

    // Change the movie poster when the user hovers over it (will not work on mobile).
    $(".movie").each(function() {
        $(this).on("hover", function() {
            $("#zero_click_image img").attr("src", image_proxy + $(this).attr("data-image"));
        });
    });
};

// Convert minutes to hr. min. format.
// e.g. {{time 90}} will return 1 hr. 30 min.
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