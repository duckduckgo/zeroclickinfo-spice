(function (env) {
    "use strict";
    env.ddg_spice_articles = function (api_result) {
        
        if (!api_result) {
            Spice.failed('articles');
        }
        
        if (api_result.error) {
            Spice.failed('articles');
        }
        
        var articles = api_result.responseData.feed.entries;
        
        if (articles.length == 0) {
            Spice.failed('articles');
        }

        Spice.add({
            id: 'articles',
            name: 'Articles By',
            data: articles,
            meta: {
                count: articles.length,
                itemType: 'Articles By'
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
            },
            normalize: function(item) {
                return {
                    title: item.name,
                    subtitle: item.publishedDate,
                    url: item.link,
                    description: item.contentSnippet
                };
            },
        });
    }
}(this));

