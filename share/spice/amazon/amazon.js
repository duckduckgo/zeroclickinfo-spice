function ddg_spice_amazon(apiResult) {
    if(!apiResult || !apiResult.results || !apiResult.results.length){ return; }

    var items = apiResult.results,
        view, template;

    if(items.length > 1){
        view = 'Tiles';
        template: 'products'
    } else {
        view = 'Base';
        template: 'products_single';
    }

    var loadRatingsData = function(items,fn){
        var numLeft = items.length,
            arg = v.rating,
            url = '/m.js?r=';

        arg = arg.replace(/(?:.com.au|.com.br|.cn|.fr|.de|.in|.it|.co.jp|.mx|.es|.co.uk|.com|.ca?)/i, '');
        arg = arg.replace('http://www.amazon/reviews/iframe?', '');

        var onGotRatingsData = function(r,s,x){

            // add the ratings data:
            v.ratingData = r;

            // decrement the numLeft and
            // see if all have returned yet:
            numLeft--;
            if(!numLeft){
                // if done, call the callback:
                fn();
            }
        }

        $.getJSON(url + encodeURIComponent(arg),onGotRatingsData);
    };

    // TODO: this is obviously not ideal, just ported over
    // what was in permenant.js. It loads ratings data for each item,
    // the render the spice plugin:
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

            view: view,

            templates: {
                item: template,
                detail: 'products_detail'
            }
        });
    });
}
