(function (env) {
    "use strict";
    env.ddg_spice_catfacts = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('catfacts');
        }

        // Render the response
        Spice.add({
            id: "catfacts",

            // Customize these properties
            name: "Random fact about cats",
            data: api_result,
            meta: {
                sourceName: "catfacts-api.appspot.com",
                sourceUrl: 'http://catfacts-api.appspot.com/doc.html'
            },
            normalize: function(item) {
                return {
                    title: item.facts
                    //content: item.facts
                };
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));
