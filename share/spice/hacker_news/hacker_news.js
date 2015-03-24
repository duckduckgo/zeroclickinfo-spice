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

        DDG.require('moment.js', function(){
            Spice.add({
                id: 'hacker_news',
                name: 'Social',
                data: api_result.hits,
                meta: {
                    sourceName: 'HN Search',
                    sourceUrl: sourceUrl,
                    total: api_result.hits,
                    itemType: (api_result.hits.length === 1) ? 'Hacker News submission' : 'Hacker News submissions',
                    searchTerm: decodeURIComponent(query)
                },
                normalize: function(item) {
                    return {
                        title: item.title,
                        url: (item.url) ? item.url : 'https://news.ycombinator.com/item?id=' + item.objectID,
                        points: item.points || 0,
                        num_comments: item.num_comments || 0,
                        post_domain: extractDomain(item.url),
                        date_from: moment(item.created_at_i * 1000).fromNow(),
                        arrowUrl: DDG.get_asset_path('hacker_news','arrow_up.png')
                    };
                },
                templates: {
                    group: 'text',
                    options: {
                        footer: Spice.hacker_news.footer
                    },
                    detail: false,
                    item_detail: false,
                    variants: {
                        tileTitle: "3line-small",
                        tileFooter: "3line"
                    }
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
            });
        });
    }

    var domainRe = new RegExp(/:\/\/([^\/]+)\/?/);

    //extract the domain from a url
    function extractDomain(url){
        if (url) return domainRe.exec(url)[1].replace('www.', '');
        return 'news.ycombinator.com';
    }
}(this));
