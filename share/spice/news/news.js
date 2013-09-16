function ddg_spice_news(api_result) {
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
            story.source = story.source + " by " + story.author;
            break;
        }
    };

    var good_stories = [];
    if(generic) {
        good_stories = api_result;
    } else {
        for(var i = 0, story; story = api_result[i]; i++) {
            var title = story.title.replace(/<b>|<\/b>|:/g, "");
            if(DDG.isRelevant(title, skip, 3)) {
                getSource(story);
                good_stories.push(story);
            }
        }
    }

    // Exit if we didn't get any results.
    if(good_stories.length === 0) {
        return;
    }

    // Limit the number of stories to 5.
    // good_stories.splice(5);

    // Display the plugin.
    Spice.render({
        header1: good_stories[0].query +  " (News)",
	source_url: good_stories[0].url,
	source_name: good_stories[0].source,

	spice_name: "news",

	template_frame: "carousel",
	template_options: {
	    items: good_stories,
	    template_item: "news",
	    li_width: 640
	},

	force_big_header: true,
	force_no_fold: true
    });
}
