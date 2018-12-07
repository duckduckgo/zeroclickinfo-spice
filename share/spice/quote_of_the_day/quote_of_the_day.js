(function (env) {
    "use strict";
    env.ddg_spice_quote_of_the_day = function(api_result) {

        if (!api_result || api_result.error) {
            return Spice.failed('quote_of_the_day');
        }

        Spice.add({
            id: "quote_of_the_day",
            signal:"high",
            name: "Quote of the Day",
            data: api_result,
            meta: {
                sourceName: "They Said So",
                sourceUrl: "https://theysaidso.com/quote/"+api_result.contents.quotes[0].id
            },
            normalize: function(item) {
                return {
                    quote : item.contents.quotes[0].quote,
                    person: item.contents.quotes[0].author,
                    len : parseInt(item.contents.quotes[0].length) + item.contents.quotes[0].author.length
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

