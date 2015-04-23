(function (env) {
    "use strict";
    
    function getImage(item, size) {    
        if (item.Premium == 1) {
            return 'http://www.statista.com/graphic/teaser/100/1/270812/inflation-rate-in-brazil.jpg';
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
                    //subtitle: 'sub:'+getTitle(item.title),
                    url: item.Link,
                    description: item.subject /*item.description*/,
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
            // Big Image
            /*normalize: function(item) {
                return {
                    title: item.subject,
                    link: item.Link,
                    url: item.Link,
                    heading: getTitle(item.title),
                    description: item.description,
                    abstract: DDG.strip_html(item.description),
                    img: getImage(item, 2),
                    image: getImage(item, 2)
                }  
            },
            templates: {
                item: 'basic_image_item',
                detail: false,
                item_detail: false,
                
                options: {
                    content: Spice.statista.content,
                    moreAt: true
                }
            },*/
        });
    };
}(this));
