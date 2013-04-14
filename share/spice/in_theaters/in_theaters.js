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

    // Get the size of the screen.
    // If the screen is small, don't display the image.
    var zero_click_image = $("#zero_click_image");
    var checkWidth = function(width) {
        if(width < 750) {
            zero_click_image.addClass("hide");
            $(".zero_click_snippet").attr("style", "margin-left: 0px !important; display: block;");
        } else {
            zero_click_image.removeClass("hide");
            $(".zero_click_snippet").attr("style", "margin-left: 0px !important; display: block; width: 80%;");
        }
    };

    // Monitor the size of the window.
    checkWidth($(window).width());
    $(window).resize(function() {
        checkWidth($(window).width());
    });

    // This variable tracks the last movie that the user hovered on.
    var last = 0;
    // Remove all `img` tags first and start over.
    // Why are we adding all the images instead of just updating the `src` attribute in $("#zero_click_image img")?
    // Because if we do that, the browser will try to request for the image again.
    zero_click_image.html("");
    $(".movie").each(function(index) {
        // We should show the first image and hide everything else by adding the class="hide" attribute.
        if(index === 0) {
            zero_click_image.append("<img style='height: 120px !important' id='Movie" + index + "' src='" + $(this).attr("data-image") + "'>");
        } else {
            zero_click_image.append("<img style='height: 120px !important' class='hide' id='Movie" + index + "' data-image='" + $(this).attr("data-image") + "'>");
        }

        // Show the image when we hover over the list of movies.
        $(this).on("hover", function() {
            // We wrap everything in a function to get hold of the index variable.
            // Why? Because the computer is so fast that by the time we hover on a movie,
            // index would point to the last element.
            (function(index) {
                var lastMovie = $("#Movie" + last);
                var newMovie = $("#Movie" + index);
                lastMovie.addClass("hide");
                newMovie.removeClass("hide");

                // Lazy loading. We should only load the image when the user hovered over it.
                if(!newMovie.attr("src")) {
                    newMovie.attr("src", newMovie.attr("data-image"));
                }
                last = index;
            })(index);
        });
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