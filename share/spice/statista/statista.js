(function (env) {
    "use strict";
    
    function getImage(item, size) {    
        if (item.Premium == 1) {
            return 'https://d28wbuch0jlv7v.cloudfront.net/static/img/openGraph-Search.png';
        } else {
            return item.teaserImageUrls[size].src;
        }
    }
    
    function getTitle(title) {
        return title.replace(/\ \|\ .+?$/, "");
    }
    
    env.ddg_spice_statista = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('statista');
        }

        Spice.add({
            id: "statista",
            name: "Statista.com",
            data: api_result.data,
            meta: {
                sourceName: "Statista.com",
                sourceUrl: 'http://www.statista.com/search/?q='+api_result.q
            },
            normalize: function(item) {
                return {
                    title: getTitle(item.title),
                    url: item.Link,
                    description: item.subject,
                    icon: getImage(item, 2)
                }  
            },
            templates: {
                group: 'icon',
                detail: false,
                item_detail: false,
                options: {
                    content: Spice.statista.content,
                    moreAt: true
                }
            },
        });
    };
}(this));
