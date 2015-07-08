(function (env) {
    "use strict";
    env.ddg_spice_yacht_specs = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('yacht_specs');
        }

        // Render the response
        Spice.add({
            id: "yacht_specs",

            // Customize these properties
            name: "Yacht Info",
            data: api_result,
            meta: {
                sourceName: "Yachtharbour.com",
                sourceUrl: 'http://yachtharbour.com' + api_result.link
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.yacht_specs.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
