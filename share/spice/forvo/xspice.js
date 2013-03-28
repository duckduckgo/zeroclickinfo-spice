var ddg_spice_forvo = function(api_result) {
    var isArray = function(obj) {
        return toString.call(obj) === "[object Array]";
    };

    var render = function(template) {
        Spice.render({
            data             : api_result,
            force_big_header : true,
            header1          : "Pronunciations by Forvo",
            source_name      : "Forvo",
            source_url       : "http://www.forvo.com/search/",
            template_normal  : template
        });
    }

    // Display spice.
    if(isArray(api_result.items) && +api_result.attributes.total >= 3) {
        render("forvo");
    } else if(+api_result.attributes.total >= 3) {
        render("forvo-fallback");
    }

    var initializePlayer = function() {
        // Initialize MediaElement.js
        $(document).ready(function() {
            $('audio').mediaelementplayer({
                audioWidth      : "51%",
                audioHeight     : 30,
                enableAutosize  : true,
                features        : ['playpause','progress','current']
            });
        });
    };

    $.getScript("/forvo/mediaelement-and-player.min.js", initializePlayer);
}

Handlebars.registerHelper('list', function(items, options) {
    var out = "";
    for(var i = 0; i < items.length && i < 3; i += 1) {
        out += options.fn(items[i]);
    }
    return out;
});