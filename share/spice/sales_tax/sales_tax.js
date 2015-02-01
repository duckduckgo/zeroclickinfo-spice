(function (env) {
    "use strict";
    env.ddg_spice_sales_tax = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('sales_tax');
        }

        // Render the response
        Spice.add({
            id: "sales_tax",

            // Customize these properties
            name: "AnswerBar title",
            data: api_result,
            meta: {
                sourceName: "Example.com",
                sourceUrl: 'http://example.com/url/to/details/' + api_result.name
            },
            templates: {
                group: 'your-template-group',
                options: {
                    content: Spice.sales_tax.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
