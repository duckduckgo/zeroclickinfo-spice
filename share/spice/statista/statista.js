(function (env) {
    "use strict";
    
    function getImage(item, size) {  
        if (item.teaserImageUrls[size]) {
            return item.teaserImageUrls[size].src;
        } else if (size == 3) {
            return 'https://static1.statista.com/Statistic/table/table-100-1.png';
        }
    }
    
    function getTitle(title) {
        return title.replace(/\ \|\ .+?$/, "");
    }
    
    function getAbstract(item) {
        var abstract = item.description;
        if (item.Premium == 1) {
            abstract = abstract + '\n (paid content)';
        }
        return abstract;
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
                    description: item.subject ,
                    icon: getImage(item, 3),
                    img_m: getImage(item, 1),
                    heading: item.subject,
                    abstract: getAbstract(item)
                }  
            },
            templates: {
                group: 'icon',
                item_detail: 'products_item_detail',
	            wrap_detail: 'base_detail',
                
                options: {
                    moreAt: true,
                    rating: false,
                    price: false,
                    brand: false
                }
            },
        });
    };
}(this));
