(function(env) {
    env.ddg_spice_reddit = function(api_response) {
        "use strict";

        // Check if we have data to work with.
        if(!api_response || api_response.error) {
            return;
        }

        // Check if we have safe search on and over18 is set to true.
        if(DDG.get_is_safe_search() && api_response.data.over18) {
            return;
        }

        Spice.add({
            id: "reddit_sub_search",
            name: "Reddit",
            data: api_response.data,
            meta: {
                itemType: api_response.data.display_name + " (SubReddit)",
                sourceUrl: 'http://www.reddit.com' + api_response.data.url,
                sourceName: 'Reddit'
            },
            templates: {
                detail: Spice.reddit_sub_search.detail
            }   
        });
    }
}(this));

Handlebars.registerHelper("redditSub_unescape", function(escaped, options) {
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
        return (typeof(r) === "string") ? r : a;
    });

    // Remove all the tags.
    options.hash.maxlen = "150";
    return Handlebars.helpers.condense(DDG.strip_html(html), options);
});

Handlebars.registerHelper("redditSub_formatSubscribers", function(subscribers) {
    "use strict";

    return String(subscribers).replace(/(\d)(?=(\d{3})+(\.\d+|)\b)/g, "$1,");
});
