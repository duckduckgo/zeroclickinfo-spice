(



function (env) {
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
                    description = DDG.strip_html(description);
                    description = decodeEntities(description);
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
    
    // Method found here to decode HTML entities:
    // http://stackoverflow.com/questions/5796718/html-entity-decode
    var decodeEntities = (function() {
      // this prevents any overhead from creating the object each time
      var element = document.createElement('div');

      function decodeHTMLEntities (str) {
        if(str && typeof str === 'string') {
          // strip script/html tags
          str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
          str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
          element.innerHTML = str;
          str = element.textContent;
          element.textContent = '';
        }

        return str;
      }

      return decodeHTMLEntities;
    })();
}(this));

