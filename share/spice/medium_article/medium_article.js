(function (env) {
    "use strict";
    env.ddg_spice_medium_article = function(api_result) {
        
        if (!api_result || api_result.error) {
            return Spice.failed('medium_article');
        }
        
        Spice.add({
            id: "medium_article",
            name: "Social",
            data: api_result.success,
            meta: {
                sourceName: "Medium.com",
                sourceUrl: "https://medium.com/search?q=" + getRemainder()
            },
            normalize: function(item) {
                return {
                    title: item.title,
                    url: item.link,
                    author: item.metadata.authorName,
                    authorProfileImage: item.metadata.authorProfileImage,
                    readingTime: item.metadata.readingTime,
                    publishedDate: item.metadata.publishedDate
                };
            },
            templates: {
                group: 'text',
                options: {
                    footer: Spice.medium_article.footer
                },
                detail: false,
                item_detail: false,
                variants: {
                    tileTitle: "3line-small",
                    tileFooter: "2line"
                }
            }
        });
    };
    
    var getRemainder = function() {
        var script = $('[src*="/js/spice/medium_article/"]')[0],
        source = $(script).attr("src"),
        query = source.match(/medium_article\/([^\/]+)/)[1],
        decodedQuery = decodeURIComponent(query);
        return decodedQuery;
    }
    
}(this));
