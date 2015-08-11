(function (env) {
    "use strict";
    var query_orig = DDG.get_query();
    //$.getJSON('https://www.zomato.com/duckduckgo/ddg_track?value='+encodeURIComponent(query_orig));
    env.ddg_spice_zomato = function(api_result){
        if (!api_result || api_result.error) {
            return Spice.failed('zomato');
        }
        //console.log(api_result);
        Spice.add({
            id: "zomato",
            name: "Places",
            model: "Place",
            view: "Places",
            signal: "high",
            data: api_result.restaurants,
            meta: {
                sourceName: "Zomato",
                sourceUrl: api_result.more_at,
                snippetChars: 110,
                sourceIcon: true,
                sourceIconurl: 'https://www.zomato.com/images/logo/zomato_favicon3.png',
                itemType: 'Places',
                searchTerm: query_orig
            },
            templates: {
                group: 'places',
                options: {
                    moreAt: true
                }
            },
            relevancy: {
                dup: 'url'
            },
            /*
            sort_fields: {
                name: function(a,b) {
                    return a.name < b.name ? -1 : 1;
                },
                rating: function(a,b) {
                    return a.rating < b.rating ? -1 : 1;
                },
                price: function(a,b) {
                    return a.price < b.price ? -1 : 1;
                },
                reviews: function(a,b) {
                    return a.reviews < b.reviews ? -1 : 1;
                }
            },
            */
            normalize: function(zres) {
                if(!zres) {
                    return null;
                }
                //console.log(zres);
                var data = zres;
                data.hours = zres.hours || null;
                data.engine = "Zomato";
                return data;
            }
            /*,
            onItemSelect: function(item){
                console.log('hi1');
                console.log(item);
                $.getJSON('https://www.zomato.com/duckduckgo/ddg_track');
            },
            onItemShown: function(item){
                console.log('hi');
                console.log(item);
                $.getJSON('https://www.zomato.com/duckduckgo/ddg_track');
            }
            */
        });
        /*
        $('#zci-zomato .tile--loc__more').each(function(ele){
            $(ele).html('<img class="tile--loc__more__icon" src="/assets/icon_favicon_placeholder.v104.png"> More at Zomato');
        });
        */
    };
}(this));
