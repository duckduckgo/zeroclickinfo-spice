function ddg_spice_reddit(api_response) {

    Spice.render({
        data              : api_response.data,
        header1           : api_response.data.display_name + " (SubReddit)",
        source_url        : 'http://www.reddit.com' + api_response.data.url,
        source_name       : 'Reddit',
        template_normal   : 'reddit_sub_search',
        force_big_header  : true,
        force_space_after : true,
    });
    // subreddit.subscribers = response.subscribers.toString().replace(/(\d)(?=(\d{3})+(\.\d+|)\b)/g, "$1,");
};

Handlebars.registerHelper("unescape", function(escaped, options) {
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
    options.hash.maxlen = "200";
    return Handlebars.helpers.condense(html.replace(/<\/?[^>]+>/g, ""), options);
});

Handlebars.registerHelper("formatSubscribers", function(subscribers) {
    return String(subscribers).replace(/(\d)(?=(\d{3})+(\.\d+|)\b)/g, "$1,");
});