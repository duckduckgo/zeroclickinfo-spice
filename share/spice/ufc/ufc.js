(function (env) {
    "use strict";
    env.ddg_spice_ufc = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('ufc');
        }

        // Render the response
        Spice.add({
            id: "ufc",

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
                    title: api_result.title,
                    subtitle: api_result.subtitle,
                    image: api_result.icon
                };
            },
            templates: {
                group: 'your-template-group',
                options: {
                    content: Spice.ufc.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
