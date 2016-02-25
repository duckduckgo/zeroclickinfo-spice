(function (env) {
    "use strict";
    env.ddg_spice_sales_tax_zip_code = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('sales_tax_zip_code');
        }

        // Render the response
        Spice.add({
            id: "sales_tax_zip_code",

            // Customize these properties
            name: "AnswerBar title",
            data: api_result,
            meta: {
                sourceName: "Example.com",
                sourceUrl: 'http://example.com/url/to/details/' + api_result.name
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title: item.title,
                    subtitle: item.subtitle,
                    image: item.icon
                };
            },
            templates: {
                group: 'your-template-group',
                options: {
                    content: Spice.sales_tax_zip_code.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
