(function (env) {
    "use strict";

    env.ddg_spice_systemetapi = function(api_result) {
        
        print(api_result);
        
        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('systemetapi');
        }

        // Render the response
        Spice.add({
            id: 'systemetapi',

            // Customize these properties
            name: 'Systemetapi',
            data: api_result,
            meta: {
                sourceName: 'Systemetapi.se',
                total: api_result
                //sourceUrl: 'http://example.com/url/to/details/' + api_result.name
                itemType: (api_result.length === 1) ? 'Dryck' : 'Drycker'
            },
            normalize: function(item) {
                return {
                    title: item.name,
                    subtitle: item.name_2,
                    url: (item.url) ? item.url : 'https://www.systembolaget.se/dryck/sprit/' + item.name + '-' + item.product_number,
                    price: item.price
                    image: 'https://openclipart.org/image/800px/svg_to_png/194077/Placeholder.png'
                };
            },
            templates: {
                group: 'products',
            }
        });
    };
}(this));

