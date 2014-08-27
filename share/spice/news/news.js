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
    var setSourceOnStory = function(story) {
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

    var entityWords = [];
    if (typeof Spice.news.entities !== 'undefined' && Spice.news.entities.length > 0) {
        for (var j = 0, entity; entity = Spice.news.entities[j]; j++) {
            var tmpEntityWords = entity.split(" ");
            for (var k = 0, entityWord; entityWord = tmpEntityWords[k]; k++) {
                if (entityWord.length > 3) {
                    entityWords.push(entityWord);
                }
            }
        }
    }

    // Check if the title is relevant to the query.
    var goodStories = [];
    for(var i = 0, story; story = apiResult[i]; i++) {
	// strip bold from story titles.
        story.title = story.title.replace(/<b>|<\/b>|:/g, "");
        if (DDG.isRelevant(story.title, skip)) {
            setSourceOnStory(story);
            goodStories.push(story);
        }

        // additional news relevancy for entities. story need only
        // contain one word from one entity to be good. strict indexof
        // check though.
        else if (entityWords.length > 0) {
            var storyOk = 0;
            var tmpStoryTitle = story.title.toLowerCase();

            for (var k = 0, entityWord; entityWord = entityWords[k]; k++) {
                if (tmpStoryTitle.indexOf(entityWord) !== -1) {
                    storyOk = 1;
                    break;
                }
            }

            if (storyOk) {
                setSourceOnStory(story);
                goodStories.push(story);
                break;
            }
        }
    }

    var searchTerm = DDG.get_query().replace(/(?: news|news ?)/i, '').trim();

    // If we found a few good stories, display them.
    if(goodStories.length >= 3) {
        Spice.add({
            id: 'news',
            name: 'News',

            data: goodStories,

            meta: {
                count: goodStories.length,
                searchTerm: searchTerm,
                itemType: 'News articles'
            },

            templates: {
                item: 'news_item'
            }
        });
    } else {
	Spice.failed('news');
    }
}
