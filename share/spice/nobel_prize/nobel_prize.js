(function (env) {
    "use strict";
    env.ddg_spice_nobel_prize = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result) {
            return Spice.failed('NobelPrize');
        }

        console.info("API Result", api_result);
        
        // Render the response
        Spice.add({
            id: "nobelprize",

            // Customize these properties
            name: "Nobel Prize",
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
                group: 'product',
//                 options: {
//                     content: Spice..content,
//                     moreAt: true
//                 }
            }
        });
    };
}(this));
