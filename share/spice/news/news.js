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

    // Check if the title is relevant to the query.
    var goodStories = [];
    for(var i = 0, story; story = apiResult[i]; i++) {
	// strip bold from story titles.
        story.title = story.title.replace(/<b>|<\/b>|:/g, "");
        if (DDG.isRelevant(story.title, skip)) {
            setSourceOnStory(story);
            goodStories.push(story);
        }

        // news relevancy for entities. story need only contain one
        // word from each entity (and the rest of the query words) to
        // be good. bypasses the relevancy check. strict indexof check
        // though.
        else if (typeof DDG.news_entities !== 'undefined' && DDG.news_entities.length > 0) {
            var seen_words = {};
            var story_ok = 1;
            var tmp_story_title = story.title.toLowerCase();

            // entity check.
            for (var j = 0, entity; entity = DDG.news_entities[j]; j++) {
                var entity_ok = 0;
                var entity_words = entity.split(" ");
                for (var k = 0, entity_word; entity_word = entity_words[k]; k++) {
                    seen_words[entity_word] = 1;
                    if (tmp_story_title.indexOf(entity_word) !== -1) {
                        entity_ok = 1;
                        break;
                    }
                }

                if (!entity_ok) {
                    story_ok = 0;
                    break;
                }
            }

            // rest of the query check
            var query_words = DDG.get_query().toLowerCase().split(" ");
            for (var j = 0, query_word; query_word = query_words[j]; j++) {
                // skip for entity words
                if (seen_words[query_word]) continue;

                if (tmp_story_title.indexOf(query_word) === -1) {
                    story_ok = 0;
                    break;
                }
                seen_words[query_word] = 1;
            }

            if (story_ok === 1) {
                setSourceOnStory(story);
                goodStories.push(story);
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
