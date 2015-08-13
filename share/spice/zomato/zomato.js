(function (env) {
    "use strict";
    var query_orig = DDG.get_query();
    env.ddg_spice_zomato = function(api_result){
        if (!api_result || api_result.error) {
            return Spice.failed('zomato');
        }
        DDG.require('maps', function() {
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
                normalize: function(zres) {
                    if(!zres) {
                        return null;
                    }
                    var data = zres;
                    data.hours = zres.hours || null;
                    data.engine = "Zomato";
                    return data;
                }
            });
        });
    };
}(this));
