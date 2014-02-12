function ddg_spice_news(apiResult) {
    "use strict";

    // Words that we have to skip in DDG.isRelevant.
    var skip = [
        "news",
        "headline",
        "headlines",
        "latest",
        "breaking",
        "update",
        "s:d",
        "sort:date"
    ];

    // Some sources need to be set by us.
    var getSource = function(story) {
        switch(story.syndicate) {
        case "Topsy":
            story.source = story.author || "Topsy";
            break;
        case "NewsCred":
            if(story.source) {
                if(story.author) {
                    story.source = story.source + " by " + story.author;
                }
            } else {
                story.source = "NewsCred";
            }
            break;
        }
    };

    // Check if the title is relevant to the query.
    var goodStories = [];
    for(var i = 0, story; story = apiResult[i]; i++) {
    // strip bold from story titles.
        story.title = story.title.replace(/<b>|<\/b>|:/g, "");
        if(DDG.isRelevant(story.title, skip, 3)) {
            getSource(story);
            goodStories.push(story);
        }
    }

    var searchTerm = DDG.get_query().replace(/(?: news|news ?)/i, '').trim();

    // If we found some good stories, display them.
    if(goodStories.length > 0) {
        Spice.render({
            id: 'news',
            name: 'News',

            data: goodStories,

            meta: {
                count: goodStories.length,
                searchTerm: searchTerm,
                itemType: 'News articles'
            },

            templates: {
                item: 'news_items'
            }
        });
    }
}
