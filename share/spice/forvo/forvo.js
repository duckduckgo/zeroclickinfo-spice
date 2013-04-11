var ddg_spice_forvo = function(api_result) {

    // From underscore.js. This function checks if obj is an array.
    var isArray = function(obj) {
        return toString.call(obj) === "[object Array]";
    };

    // This function initializes the audio player.
    var initializePlayer = function() {
        $(document).ready(function() {
            $('audio').mediaelementplayer({
                audioWidth      : "51%",
                audioHeight     : 30,
                enableAutosize  : true,
                features        : ['playpause','progress','current']
            });
        });
    };

    // Display the data and load MediaElement.js.
    var render = function(template) {
        Spice.render({
            data             : api_result,
            force_big_header : true,
            header1          : "Pronunciations by Forvo",
            source_name      : "Forvo",
            source_url       : "http://www.forvo.com/",
            template_normal  : template
        });

        $.getScript("/forvo/mediaelement-and-player.min.js", initializePlayer);
    }

    // Check if api_result.items is an array or not.
    if(isArray(api_result.items) && +api_result.attributes.total >= 3) {
        render("forvo");
    } else if(+api_result.attributes.total >= 3) {
        render("forvo-fallback");
    }
}

// Make sure we display only three items.
Handlebars.registerHelper('list', function(items, options) {
    var out = "";
    for(var i = 0; i < items.length && i < 3; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});