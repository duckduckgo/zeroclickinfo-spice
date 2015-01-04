(function (env) {
    "use strict";
    env.ddg_spice_github_languages = function(api_result){

        // Validate the response (customize for your Spice)
        if (api_result.error) {
            return Spice.failed('github_languages');
        }

        // Render the response
        Spice.add({
            id: "github_languages",

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
                    content: Spice.github_languages.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
