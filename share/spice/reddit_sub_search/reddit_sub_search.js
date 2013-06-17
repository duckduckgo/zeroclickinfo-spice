function ddg_spice_reddit(api_response) {
    "use strict";

    Spice.render({
        data              : api_response.data,
        header1           : api_response.data.display_name + " (SubReddit)",
        source_url        : 'http://www.reddit.com' + api_response.data.url,
        source_name       : 'Reddit',
        template_normal   : 'reddit_sub_search',
        force_big_header  : true,
        force_space_after : true
    });
}

Handlebars.registerHelper("unescape", function(escaped, options) {
    "use strict";

    var unescape = {
        "&amp": "&",
        "&lt": "<",
        "&gt": ">",
        "&quot": '"',
        "&#x27": "'",
        "&#x2F": '/'
    };

    var html = escaped.replace(/(&[^;]+);/g, function(a, b) {
        var r = unescape[b];
        return typeof r === "string" ? r : a;
    });

    // Remove all the tags.
    options.hash.maxlen = "150";
    return Handlebars.helpers.condense(DDG.strip_html(html), options);
});

Handlebars.registerHelper("formatSubscribers", function(subscribers) {
    "use strict";

    return String(subscribers).replace(/(\d)(?=(\d{3})+(\.\d+|)\b)/g, "$1,");
});