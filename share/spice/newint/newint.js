(function (env) {
    "use strict";
    env.ddg_spice_newint = function(api_result){

        if (api_result.error) {
            return Spice.failed('newint');
        }

        Spice.add({
            id: "newint",
            name: "Newint",
            data: api_result,
            meta: {
                itemType: "New Internationalist magazines",
                sourceName: "digital.newint.com.au",
                sourceUrl: 'https://digital.newint.com.au/issues'
            },
            normalize: function(item){
                var month_names = new Array("January", "February", "March", 
                    "April", "May", "June", "July", "August", "September", 
                    "October", "November", "December");
                return {
                    release_date: month_names[DDG.getDateFromString(item.release).getMonth()] + " " + DDG.getDateFromString(item.release).getFullYear(),
                    img: item.cover.thumb2x.url,
                    img_m: item.cover.thumb2x.url,
                    price: item.price ? item.price : "AUD$7.50",
                    heading: item.title,
                    brand: "New Internationalist",
                    url: "https://digital.newint.com.au/issues/" + item.id
                };
            },
            templates: {
                group: 'products',
                options:{
                    rating: false,
                    moreAt: true,
                    subtitle_content: Spice.newint.content,
                    buy: Spice.newint.buy
                }
            }
        });
    };
}(this));
