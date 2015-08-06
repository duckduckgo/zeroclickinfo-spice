(function (env) {
    "use strict";
    env.ddg_spice_indego_bikeshare_locations = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('indego_bikeshare_locations');
        }

        // Render the response
        Spice.add({
            id: "indego_bikeshare_locations",

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
                    content: Spice.indego_bikeshare_locations.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
