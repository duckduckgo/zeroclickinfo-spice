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

    // Check if the word news is in the query.
    var generic = false;
    if((/\bnews\b/i).test(DDG.get_query())) {
        generic = true;
    }

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

    for(var i = 0, story; story = apiResult[i]; i++) {
        story.title = story.title.replace(/<b>|<\/b>|:/g, "");
    }

    // Relevancy:
    // Check if the title is relevant to our query.
    var goodStories = [];
    if(generic) {
        goodStories = apiResult;
    } else {
        for(var i = 0, story; story = apiResult[i]; i++) {
            if(DDG.isRelevant(story.title, skip, 3)) {
                getSource(story);
                goodStories.push(story);
            }
        }
    }

    // Exit if we didn't get any results.
    if(goodStories.length === 0) {
        return;
    }

    // display good stories if there are some!
    DDG.duckbar.news.display(goodStories);
}
