(function(env) {
    "use strict";

    env.ddg_spice_hacker_news = function(api_result) {
	var script = $('[src*="/js/spice/hacker_news/"]')[0];
	var source = $(script).attr("src");
	var query = source.match(/hacker_news\/([^\/]+)/)[1];
	var sourceUrl = 'https://hn.algolia.com/#!/story/forever/0/' + query;
    
	if(!api_result || !api_result.hits || api_result.hits.length === 0) {
	    return;
	}

	Spice.add({
            id:   'hacker_news',
            name: 'Hacker News',

            data: api_result.hits,

            meta: {
		sourceName: 'Hacker News',
		sourceUrl: sourceUrl,
		sourceIcon: true,
		total: api_result.hits,
		itemType: 'Hacker News',
		searchTerm: decodeURIComponent(query)
            },

            normalize: function(o) {
		return {
                    title: o.title,
                    url: (o.url) ? o.url : 'https://news.ycombinator.com/item?id=' + o.objectID,
                    points: o.points || 0,
                    pointsLabel: (o.points == 1) ? 'Point' : 'Points',
                    num_comments: o.num_comments || 0,
                    commentsLabel: (o.num_comments == 1) ? 'Comment' : 'Comments',
                    domain: 'news.ycombinator.com',
		    id: o.objectID
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
