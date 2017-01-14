(function (env) {
    "use strict";
    env.ddg_spice_news = function (api_result) {

        if (!api_result || !api_result.results) {
            return Spice.failed('news');
        }

        var useRelevancy = (DDG.opensearch.installed.experiment === "static_news" && DDG.opensearch.installed.variant === 'a') ? 0 : 1,
            entityWords = [],
            goodStories = [],
            searchTerm = DDG.get_query().replace(/(?: news|news ?)/i, '').trim(),

         // Some sources need to be set by us.
            setSourceOnStory = function(story) {
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

       
        if (useRelevancy) {
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

            if (Spice.news && Spice.news.entities && Spice.news.entities.length) {
                for (var j = 0, entity; entity = Spice.news.entities[j]; j++) {
                    var tmpEntityWords = entity.split(" ");
                    for (var k = 0, entityWord; entityWord = tmpEntityWords[k]; k++) {
                        if (entityWord.length > 3) {
                            entityWords.push(entityWord);
                        }
                    }
                }
            }
        }

        // Check if the title is relevant to the query.
        for(var i = 0, story; story = api_result.results[i]; i++) {
            if (!useRelevancy || DDG.isRelevant(story.title, skip)) {
                setSourceOnStory(story);
                story.sortableDate = parseInt(story.date || 0);
                goodStories.push(story);

            // additional news relevancy for entities. story need only
            // contain one word from one entity to be good. strict indexof
            // check though.
            } else if (entityWords.length > 0) {
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
                }
            }
        }

        if (useRelevancy && goodStories < 3) {
            return Spice.failed('news');
        }


        Spice.add({
            id: 'news',
            name: 'News',
            data: goodStories,
            ads: api_result.ads,
            meta: {
                idField: 'url',
                count: goodStories.length,
                searchTerm: searchTerm,
                itemType: 'Recent News',
                rerender: [
                    'image'
                ]
            },
            templates: {
                item: 'news_item'
            },
            onItemShown: function(item) {
                if (!item.fetch_image || item.image || item.fetched_image) { return; }

                // set flag so we don't try to fetch more than once:
                item.fetched_image = 1;

                // try to fetch the image and set it on the model
                // which will trigger the tile to re-render with the image:
                $.getJSON('/f.js?o=json&i=1&u=' + item.url, function(meta) {
                    if (meta && meta.image) {
                       item.set('image', meta.image); 
                    }
                });
            },
            sort_fields: {
                date: function(a, b) {
                    return b.sortableDate - a.sortableDate;
                }
            },
            sort_default: 'date'
        });
    }
}(this));
