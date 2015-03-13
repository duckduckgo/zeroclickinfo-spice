(function (env) {
    "use strict";
    env.ddg_spice_upc = function(api_result){

        if (api_result.valid == 'false') {
            return Spice.failed('upc');
        }

        Spice.add({
            id: "upc",
            name: "Universal Product Code (UPC)",
            data: api_result,
            meta: {
                sourceName: "upcdatabase.org",
                sourceUrl: 'http://upcdatabase.org/code/' + api_result.number
            },
            normalize: function(item) {
                if (item.valid == 'false') {
                    return Spice.failed('upc');
                }

                return {
                    description: '"' + item.alias + '" has average price $' + item.avg_price + ', with ' + item.rate_up + ' upvotes and ' + item.rate_down + ' downvotes.',
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
