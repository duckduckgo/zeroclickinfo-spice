function ddg_spice_hacker_news(api_result) {
    var script = $('[src*="/js/spice/hacker_news/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/hacker_news\/([^\/]+)/)[1];
    var source_url = 'https://www.hnsearch.com/search#request/all&q=' + query;

    Spice.add({
        id:   'hacker_news',
        name: 'Hacker News',

        data: api_result.results,

        meta: {
            sourceName: 'Hacker News',
            sourceUrl: source_url,
            sourceIcon: true,
            total: api_result.hits,
            itemType: 'Results'
        },

        normalize: function(o) {
            // perhaps if o.numComments < a threshold return null;
            return {
                // could create a Date object from o.item.create_ts for display, sorting by date
                title: o.item.title,
                url: (o.item.url) ? o.item.url : 'http://news.ycombinator.com/item?id=' + o.item.id,
                points: o.item.points || 0,
                pointsLabel: (o.item.points == 1) ? 'Point' : 'Points',
                num_comments: o.item.num_comments || 0,
                commentsLabel: (o.item.numComments == 1) ? 'Comment' : 'Comments',
                domain: o.item.domain || 'news.ycombinator.com'
            };
        },

        templates: {
            item: Spice.hacker_news.hacker_news
        },

        relevancy: {
            skip_words: [ 'hacker', 'news', 'hn' ],
            primary: [
                { required: 'item.title' },
                { key: 'item.title', strict:false}
            ]
        },

    });

    // Add click event.
    $("a.hn_showHide").click(function(){
        if ($(this).data("target")){
            var target = $(this).data("target");
            $(target).toggle();
        }
    });
}

