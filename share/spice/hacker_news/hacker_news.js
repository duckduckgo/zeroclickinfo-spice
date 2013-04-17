function ddg_spice_hacker_news(api_result) {
    "use strict";

    // Check for at least 1 result
    if (api_result.hits < 1) {
        return;
    }

    // Get the original query.
    // We're going to pass this to the More at SoundCloud link.
    var matched, result, query;
    $("script").each(function() {
        matched = $(this).attr("src");
        if(matched) {
            result = matched.match(/\/js\/spice\/hacker_news\/(.+)/);
            if(result) {
                query = result[1];
            }
        }
    });

    Spice.render({
        data:               api_result,
        header1 :           "Hacker News",
        source_url :        "http://www.hnsearch.com/search#request/all&q=" + query,
        source_name :       "Hacker News",
        template_normal :   "hacker_news",
        force_big_header :  true
    });

    // Add click event.
    $("a.hn_showHide").click(function(){
        if ($(this).data("target")){
            var target = $(this).data("target");
            $(target).toggle();
        }
    });
}


// creates an anchor linking to a result's commments
Handlebars.registerHelper("organizeResults", function(options) {
    "use strict";

    /* HackerNews Object
     * Contains result lists
     */
    function HackerNews(data) {

        this.limit = (data.request.limit < data.hits) ? data.request.limit : data.hits;
        this.topStories = [];
        this.topComments = [];
        this.otherStories = [];

        function isStory (r) {
            return (r.type === "submission");
        }

        // Adds result object to appropriate list
        this.addResult = function (result) {
            var location;

            if (this.topStories.length < 3 && isStory(result)) {
                location = this.topStories;
            } else {
                location = isStory(result) ? this.otherStories : this.topComments;
            }
            location.push(result);
        };

        this.canUse = function (result) {

            if (isStory(result) && (this.otherStories.length < 3 || this.topStories.length < 3)) {
                return true;
            } else if (!isStory(result) && this.topComments.length < 3) {
                return true;
            } else {
                return false;
            }
        };

        this.isFull = function () {
            if (this.topStories.length > 2 && this.otherStories.length > 2 &&
                this.topComments.length > 2) {
                return true;
            } else {
                return false;
            }
        };
    }

    var hn = new HackerNews(this);
    var result;

    for (var i = 0; i < hn.limit; i += 1) {
        // Grab item
        result = this.results[i].item;

        // Check if result is needed
        // and append to correct list
        if (hn.canUse(result)) {
            hn.addResult(result);
        }

        if (hn.isFull()){
            break;
        } else {
            continue;
        }
    }

    // Invoke context of template with hn object as context.
    return options.fn(hn);
});


// Creates an anchor linking to an item's commments.
Handlebars.registerHelper("hn_comment", function(text) {
    "use strict";

    var temp = d.createElement("div");
    temp.innerHTML = text;
    var cleanText = $(temp).text();

    return Handlebars.helpers.condense(cleanText, {hash:{maxlen:"120"}});
});


// Pluralizes a word when necessary.
Handlebars.registerHelper("plural", function(num) {
    "use strict";

    return ((num !== 1)? "s" : "");
});


// Returns a link to the HN user with given id.
Handlebars.registerHelper("user_link", function(id) {
    "use strict";

    return "<a href='https://news.ycombinator.com/user?id=" + id + "'>" +
            id + "</a>";
});


// Returns a link to the HN item (story, comment) with given id.
Handlebars.registerHelper("item_link", function(text) {
    "use strict";

    var id = (text === "parent") ? this.discussion.id : this.id;

    return "<a href='https://news.ycombinator.com/item?id=" + id + "'>" +
            Handlebars.helpers.condense(text, {hash: {maxlen: "30"}}) +
            "</a>";
});
