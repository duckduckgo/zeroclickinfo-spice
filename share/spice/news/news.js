(function (env) {
    "use strict";
    env.ddg_spice_news = function (api_result) {

        if (!api_result || !api_result.results || !api_result.results.length) {
            return Spice.failed('news');
        }

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
        for(var i = 0, story; story = api_result.results[i]; i++) {
            setSourceOnStory(story);
            story.sortableDate = parseInt(story.date || 0);
            goodStories.push(story);
        }

        var searchTerm = DDG.get_query().replace(/(?: news|news ?)/i, '').trim();

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
