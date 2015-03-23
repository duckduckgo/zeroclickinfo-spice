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
                    itemType: "New Internationalist magazines",
                    sourceName: "New Internationalist",
                    sourceUrl: 'https://digital.newint.com.au/issues'
                },
                normalize: function(item){
                    var editors_letter_strip_tags = item.editors_letter_html.replace(/<h[1-6]>(.*?)<\/h[1-6]>/g, "<p>$1. </p>");
                    editors_letter_strip_tags = editors_letter_strip_tags.replace(/<a(.*?)>(.*?)<\/a>/g, "$2");
                    console.log('using moment');
                    return {
                        release_date: moment(item.release).format('MMMM YYYY'),
                        img: item.cover.thumb2x.url,
                        img_m: item.cover.thumb2x.url,
                        price: item.price ? item.price : "AUD$7.50",
                        heading: item.title,
                        editors_letter_html: DDG.strip_html(editors_letter_strip_tags),
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
        });
    };
}(this));
