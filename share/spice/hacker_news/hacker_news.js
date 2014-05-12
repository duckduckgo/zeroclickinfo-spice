(function(env) {
    "use strict";

    env.ddg_spice_hacker_news = function(api_result) {
        var script = $('[src*="/js/spice/hacker_news/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/hacker_news\/([^\/]+)/)[1],
            sourceUrl = 'https://hn.algolia.com/#!/story/forever/0/' + query;

        if(!api_result || !api_result.hits || api_result.hits.length === 0) {
            return Spice.failed('hacker_news');
        }

        Spice.add({
            id: 'hacker_news',
            name: 'News',
            data: api_result.hits,
            meta: {
                sourceName: 'HN Search',
                sourceUrl: sourceUrl,
                total: api_result.hits,
                itemType: 'Hacker News',
                searchTerm: decodeURIComponent(query)
            },
            normalize: function(item) {
                return {
                    title: item.title,
                    url: (item.url) ? item.url : 'https://news.ycombinator.com/item?id=' + item.objectID,
                    points: item.points || 0,
                    pointsLabel: (item.points == 1) ? 'Point' : 'Points',
                    num_comments: item.num_comments || 0,
                    commentsLabel: (item.num_comments == 1) ? 'Comment' : 'Comments',
                    domain: 'news.ycombinator.com',
                    id: item.objectID
                };
            },
            templates: {
                item_custom: Spice.hacker_news.item
            }
            /*
            relevancy: {
                skip_words: [ 'hacker', 'news', 'hn', 'hackernews', 'news.yc', 'news.ycombinator.com', 'hn search', 'search' ],
                primary: [
                    { required: 'title' },
                    { key: 'title', strict: false}
                ]
            },
            */
        });
    }
}(this));
