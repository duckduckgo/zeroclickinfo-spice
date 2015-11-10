(function (env) {
    "use strict";
    env.ddg_spice_articles = function (api_result) {
        
        if (!api_result) {
            Spice.failed('articles');
        }
        
        if (api_result.error) {
            Spice.failed('articles');
        }
        
        var articles = api_result.rss.channel.item;
        
        if (articles.length == 0) {
            Spice.failed('articles');
        }
        if (articles.length > 20) {
            articles = articles.slice(0,20);
        }

        Spice.add({
            id: 'articles',
            name: 'Articles',
            data: articles,
            meta: {
                count: articles.length,
                itemType: 'Articles'
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
            },
            normalize: function(item) {
                var description = '';
                if (typeof item.description !== 'undefined') {
                    description = item.description.text;
                    description = description.replace(/(<([^>]+)>)/ig,"");
                    description = description.replace(/&quot;/ig,"\"");
                    description = description.replace(/&#039;/ig,"'");
                    
                }
                return {
                    title: item.title.text,
                    subtitle: item.pubDate.text,
                    url: item.link.text,
                    description: description
                };
            },
        });

    }
}(this));

