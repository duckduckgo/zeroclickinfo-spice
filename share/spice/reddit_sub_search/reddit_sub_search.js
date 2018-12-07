(function(env) {
    env.ddg_spice_reddit = function(api_response) {
        "use strict";

        // Check if we have data to work with.
        if(!api_response || api_response.error) {
            return Spice.failed('reddit_sub_search');
        }

        // Check if we have safe search on and over18 is set to true.
        if(DDG.get_is_safe_search() && api_response.data.over18) {
            return Spice.failed('reddit_sub_search');
        }

        Spice.add({
            id: "reddit_sub_search",
            name: "Social",
            data: api_response.data,
            meta: {
                itemType: 'Posts',
                sourceUrl: 'http://www.reddit.com' + api_response.data.url,
                sourceName: 'Reddit'
            },
            normalize: function(item) {
                return {
                    title: "/r/" + item.title,
                    subtitle: item.submit_link_label,
                    record_data: {
                        "Title": item.title,
                        "Description": item.public_description,
                        "Subscribers": item.subscribers.toLocaleString()
                    }
                };
            },
            templates: {
                group: 'text',
                options: {
                    content: 'record',
                    moreAt: true
                }
            }   
        });
    }
}(this));

Handlebars.registerHelper("redditSub_unescape", function(escaped, options) {
    "use strict";
    options.hash.maxlen = "150";
    return Handlebars.helpers.condense(DDG.unescape(DDG.strip_html(escaped), options));
});

Handlebars.registerHelper("redditSub_formatSubscribers", function(subscribers) {
    "use strict";

    return String(subscribers).replace(/(\d)(?=(\d{3})+(\.\d+|)\b)/g, "$1,");
});
