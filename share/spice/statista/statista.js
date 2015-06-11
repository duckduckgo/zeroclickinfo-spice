(function (env) {
    "use strict";
    
    function getImage(item, size) {  
        if (item.teaserImageUrls[size]) {
            return item.teaserImageUrls[size].src;
        } else {
            return 'https://static1.statista.com/Statistic/table/table-100-1.png';
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
            name: "Statista",
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
                    icon: getImage(item, 3)
                }  
            },
            templates: {
                group: 'icon',
                detail: false,
                item_detail: false,
                options: {
                    moreAt: true
                }
            },
        });
    };
}(this));
