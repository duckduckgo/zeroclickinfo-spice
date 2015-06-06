(function (env) {
    "use strict";
    env.ddg_spice_nyctransit = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('nyctransit');
        }

        // Render the response
        Spice.add({
            id: "nyctransit",

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
                    content: Spice.nyctransit.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
