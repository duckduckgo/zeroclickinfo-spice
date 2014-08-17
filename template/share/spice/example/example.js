(function (env) {
    "use strict";
    env.ddg_spice_npm = function(api_result){

        // Validate the response
        if (api_result.error) {
            return Spice.failed('<: $lia_name :>');
        }
        
        // Render the response
        Spice.add({
            id: "<: $lia_name :>",
            
            // Customize these properties
            name: "AnswerBar title",
            data: api_result,
            meta: {
                sourceName: "Example.com",
                sourceUrl: 'http://example.com/url/to/details/' + api_result.name
            },
            templates: {
                group: 'your-template-groups',
                options: {
                    content: Spice.npm.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
