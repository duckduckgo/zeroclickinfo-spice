(function (env) {
    "use strict";
    env.ddg_spice_newint = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('newint');
        }

        DDG.require("moment.js", function() {
            Spice.add({
                id: "newint",
                name: "Magazines",
                data: api_result,
                meta: {
                    primaryText: "Showing " + api_result.length + " New Internationalist magazines",
                    sourceName: "New Internationalist",
                    sourceUrl: 'https://digital.newint.com.au/issues'
                },
                normalize: function(item){
                    return {
                        subtitle: true,
                        release_date: moment(item.release).format('MMMM YYYY'),
                        image: item.cover.thumb2x.url,
                        price: item.price ? item.price : "AUD$7.50",
                        heading: item.title,
                        editors_letter_html: DDG.strip_html(item.editors_letter_html),
                        brand: "New Internationalist",
                        url: "https://digital.newint.com.au/issues/" + item.id
                    };
                },
                templates: {
                    group: 'products',
                    options:{
                        rating: false,
                        moreAt: true,
                        detailMediaShape: 'square',
                        subtitle_content: Spice.newint.content,
                        buy: Spice.newint.buy
                    }
                }
            });
        });
    };
}(this));
