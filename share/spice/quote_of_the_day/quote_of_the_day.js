(function (env) {
    "use strict";
    env.ddg_spice_quote_of_the_day = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('quote_of_the_day');
        }

        // Render the response
        Spice.add({
            id: "quote_of_the_day",

            // Customize these properties
            name: "Quote of the Day",
            data: api_result,
            meta: {
                sourceName: "They Said So",
                sourceUrl: 'http://theysaidso.com'
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    quote : item.contents.quotes[0].quote,
                    person: item.contents.quotes[0].author
                };
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.quote_of_the_day.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
