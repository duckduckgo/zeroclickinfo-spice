function ddg_spice_hacker_news(api_result) {
    // Check for at least 1 result
    if (!api_result.results.length) {
        return;
    }

    var script = $('[src*="/js/spice/hacker_news/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/hacker_news\/([^\/]+)/)[1];
    var source_url = 'https://www.hnsearch.com/search#request/all&q=' + query;

    var items = api_result.results.map(function(result){
        var item = result.item;
        item.url = (item.url) ? item.url : 'http://news.ycombinator.com/item?id=' + item.id;

        item.points = item.points || 0;
        item.pointsLabel = (item.points == 1) ? 'Point' : 'Points';
        item.num_comments = item.num_comments || 0;
        item.commentsLabel = (item.numComments == 1) ? 'Comment' : 'Comments';

        item.domain = item.domain || 'news.ycombinator.com';

        return item;
    });

    Spice.render({
        id:   'hacker_news',
        name: 'Hacker News',

        data: items,

        meta: {
            sourceName: 'Hacker News',
            sourceUrl: source_url,
            sourceIcon: true,
            count: items.length,
            total: api_result.hits,
            itemType: 'Results'
        },

        templates: {
            item: 'hacker_news'
        }
    });

    // Add click event.
    $("a.hn_showHide").click(function(){
        if ($(this).data("target")){
            var target = $(this).data("target");
            $(target).toggle();
        }
    });
}

