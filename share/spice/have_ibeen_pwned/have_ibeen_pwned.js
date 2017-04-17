(function (env) {
    "use strict";
    env.ddg_spice_have_ibeen_pwned = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('have_ibeen_pwned');
        }

        // Render the response
        Spice.add({
            id: "have_ibeen_pwned",

            // Customize these properties
            name: "Have I Been Pwned?",
            data: api_result,
            meta: {
                sourceName: "https://haveibeenpwned.com",
                sourceUrl: 'https://haveibeenpwned.com'
            },
            templates: {
                group: 'info',
                options: {
                    moreAt: false,
                    content: Spice.have_ibeen_pwned.content
                }
            },
                
            }
        });
    };
}(this));