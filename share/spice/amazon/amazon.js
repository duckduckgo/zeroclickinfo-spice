function ddg_spice_amazon(apiResult) {
    if(!apiResult || !apiResult.results || !apiResult.results.length){ return; }

    var items = apiResult.results;

    // TODO: this is obviously not ideal, just ported over
    // what was in permenant.js. It loads ratings data for each item,
    // the render the spice plugin:
    var loadRatingsData = function(items,fn){
        var numLeft = items.length;

        var onGotRatingsData = function(r,s,x){
            // add the ratings data:
            this.ratingData = r;

            // add the products_buy template
            // TODO: this is hacky, can it combine with the Spice.templates?
            this.products_buy = Handlebars.templates.products_amazon_buy;

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
        Spice.render({
            id: 'products',
            name: 'Products',

            data: items,

            meta: {
                count: items.length,
                total: items.length,
                itemType: 'Products',
                sourceName: 'Amazon',
                sourceUrl: apiResult.more_at,
                sourceIcon: true
            },

            templates: {
                item: 'products',
                detail: 'products_detail',
                summary: 'products_single'
            }
        });
    });
}
