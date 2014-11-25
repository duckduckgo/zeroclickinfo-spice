(function (env) {
    "use strict";
    env.ddg_spice_economic_indicators = function(api_result){

        // Validate the response (customize for your Spice)
        if (api_result.error) {
            return Spice.failed('economic_indicators');
        }

        // Render the response
        Spice.add({
            id: "economic_indicators",

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
                    content: Spice.economic_indicators.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
