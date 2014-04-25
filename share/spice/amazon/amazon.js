function ddg_spice_amazon(api_result) {
    "use strict";

    if (!api_result || !api_result.results ||
	!api_result.results.length || api_result.results.length == 0) {
	return; // Spice.failed('amazon');
    }

    var items = api_result.results;

    // TODO: this is obviously not ideal, just ported over
    // what was in permenant.js. It loads ratings data for each item,
    // the render the spice plugin:
    var loadRatingsData = function(items,fn){
        var numLeft = items.length;

        var onGotRatingsData = function(r,s,x){

            if (r.stars.match(/stars-(\d)-(\d)/)) {
                this.rating = RegExp.$1 + "." + RegExp.$2;
            }
            this.reviewCount = r.reviews;

            // decrement the numLeft and
            // see if all have returned yet:
            numLeft--;
            if(!numLeft){
                // if done, call the callback:
                fn();
            }
        }

        for(var i=0;i<items.length;i++){
            var item = items[i],
                arg = item.rating,
                url = '/m.js?r=';

            arg = arg.replace(/(?:.com.au|.com.br|.cn|.fr|.de|.in|.it|.co.jp|.mx|.es|.co.uk|.com|.ca?)/i, '');
            arg = arg.replace('http://www.amazon/reviews/iframe?', '');
            $.getJSON(url + encodeURIComponent(arg),onGotRatingsData.bind(item));
        }
    };

    // loading ratings data for all the items
    // then render the spice:
    loadRatingsData(items,function(){
        Spice.add({
            id: 'products',
            name: 'Products',

            data: items,

            meta: {
                count: items.length,
                total: items.length,
                itemType: 'Products',
                sourceName: 'Amazon',
                sourceUrl: api_result.more_at,
                sourceIcon: true
            },

            template_group: 'products',

            templates: {
                options: {
                    buy: 'products_amazon_buy'
                }
            }
        });
    });
}
