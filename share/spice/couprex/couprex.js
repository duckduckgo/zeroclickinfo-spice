(function (env) {
    "use strict";
    env.ddg_spice_couprex = function(api_result){

        if (!api_result || api_result.count === 0) {
            return Spice.failed('couprex');
        }

        var script = $('[src*="/js/spice/couprex/"]')[0],
            source = $(script).attr("src"),
            query = decodeURIComponent(source.match(/couprex\/([^\/]+)/)[1]);


        var numRe = /$\d+|\d+%|\bfree\b/,
            symbolRe = /[$%]/;

        function getNum(text){
            var lcText = text.toLowerCase();
            var match = numRe.exec(text);
            if (!match) {
                return null;
            }
            return match[0].replace(symbolRe, "").replace(/free/, "Free");
        }

        function getSymbol(text){
            var array = symbolRe.exec(text);
            return array[0] || null;
        }


        DDG.require('moment.js', function(){
            Spice.add({
                id: "couprex",
                name: "Coupons",
                data: api_result.posts,
                meta: {
                    sourceName: "Couprex",
                    sourceUrl: 'http://couprex.com/?s=' + query
                },
                normalize: function(item) {
                    var company_url = item.custom_fields.clpr_coupon_aff_url[0].replace(/(https?:\/\/)?www\./, "");

                    var num = getNum(item.title);
                    if (!num){
                        return false;
                    }

                    return {
                        number: num,
                        symbol: getSymbol(item.title),
                        image: "http://logo.clearbit.com/" + company_url + "?size=40",
                        description: DDG.strip_html(item.content),
                        brand: item.taxonomy_stores[0].title
                    };
                },
                templates: {
                    group: 'base',
                    detail: false,
                    item_detail: false,
                    options: {
                        moreAt: true,
                        content: Spice.couprex.content
                    },
                    elClass: {
                        tileBody: "text-center"
                    }
                },

                relevancy: {
                    primary: [
                        { required: "custom_fields.clpr_coupon_aff_url" },
                        { required: "title" },
                        { required: "content" }
                    ]
                }
            });
        });
    };
}(this));
