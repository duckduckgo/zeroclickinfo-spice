(function (env) {
    "use strict";
    env.ddg_spice_uv = function(api_result){

        // Validate the response (customize for your Spice)
        if (api_result.error) {
            return Spice.failed('uv');
        }

        // Render the response
        Spice.add({
            id: "uv",

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
                    content: Spice.uv.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
