(function (env) {
    "use strict";

    env.ddg_spice_sentencer = function(api_result) {
        if (!api_result || api_result.error) {
            return Spice.failed('sentencer');
        };
        
        // Render the response
        Spice.add({
            id: "sentencer",
            name: "Metahorpsum",
            //data: api_result,
            data: {
                //content: api_result.text,
                title: "Randomly generated metaphor",
                subtitle: api_result.text
            },
            meta: {
                sourceName: "Metahorpsum",
                sourceUrl: "http://metaphorpsum.com"
            },

            templates: {
                group: 'text',
                options: {
                    content: Spice.sentencer.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
