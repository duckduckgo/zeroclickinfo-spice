(function(env) {
    "use strict";

    env.ddg_spice_hacker_news = function(api_result) {
        var script = $('[src*="/js/spice/hacker_news/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/hacker_news\/([^\/]+)/)[1],
            sourceUrl = 'https://hn.algolia.com/#!/story/forever/0/' + query,
            now = Math.floor(new Date().getTime() / 1000);

        if(!api_result || !api_result.hits || api_result.hits.length === 0) {
            return Spice.failed('hacker_news');
        }

        Spice.add({
            id: 'hacker_news',
            name: 'Social',
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
                    date: fuzzyDate(now - item.created_at_i),
                    id: item.objectID
                };
            },
            templates: {
                item_custom: Spice.hacker_news.item
            },
            sort_fields: {
                score: function(a, b){
                    return (a.points > b.points) ? -1 : 1;
                },
                date: function(a, b){
                    return (a.created_at_i > b.created_at_i) ? -1 : 1;
                }
            },
            sort_default: 'score'
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

    //get a relative duration ("3 days ago") from a difference between two Unix timestamps
    function fuzzyDate(delta){
        var MINUTE = 60,
            HOUR = 60 * MINUTE,
            DAY = 24 * HOUR,
            MONTH = 30 * DAY,
            YEAR = 365 * MONTH;

        if (delta < 45*MINUTE){
            return Math.round(delta / MINUTE) + " minutes ago";
        } else if (delta < 90*MINUTE) {
            return 'an hour ago';
        } else if (delta < 24*HOUR){
            return Math.round(delta / HOUR) + " hours ago";
        } else if (delta < 48*HOUR){
            return 'yesterday';
        } else if (delta < 30*DAY){
            return Math.round(delta / DAY) + " days ago";
        } else if (delta < 12*MONTH){
            var months = Math.round(delta / MONTH);
            return (months === 1) ? 'a month ago' : months + " months ago";
        } else {
            var years = Math.round(delta / YEAR);
            return (years === 1) ? 'a year ago' : years + " years ago";
        }
    }
}(this));
