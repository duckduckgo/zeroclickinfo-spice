(function (env) {
    "use strict";
    env.ddg_spice_upc = function(api_result){

        if (!api_result || api_result.valid === 'false') {
            return Spice.failed('upc');
        }

        Spice.add({
            id: "upc",
            name: "Answer",
            data: api_result,
            meta: {
                sourceName: "upcdatabase.org",
                sourceUrl: 'http://upcdatabase.org/code/' + api_result.number
            },
            normalize: function(item) {
                if (item.valid == 'false') {
                    return Spice.failed('upc');
                }

                var alias = (item.alias != '') ? item.alias : item.itemname;
                var avg_price = (item.avg_price != '') ? item.avg_price : "0";
                var rate_up = (item.rate_up != '') ? item.rate_up : "0";
                var rate_down = (item.rate_down != '') ? item.rate_down : "0";

                return {
                    alias: alias,
                    avg_price: avg_price,
                    rate_up: rate_up,
                    rate_down: rate_down,
                    title: item.itemname
                };
            },
            templates: {
                group: 'text',
                options: {
                    content: Spice.upc.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
