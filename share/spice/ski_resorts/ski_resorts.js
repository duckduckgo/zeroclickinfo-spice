(function (env) {
    "use strict";
    env.ddg_spice_ski_resorts = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('ski_resorts');
        }

        // Render the response
        Spice.add({
            id: "ski_resorts",

            // Customize these properties
            name: "Ski Resort",
            data: api_result,
            meta: {
                sourceName: "Piste.io",
                sourceUrl: 'http://www.piste.io/' + api_result.name
            },
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    title: "La Plagne",
                    subtitle: "test",
                    image: 'http://www.piste.io/thumbs/la-plagne.jpg'
                };
            },
            templates: {
                group: 'icon',
                options: {
                    title: 'Test',
                    image: 'http://www.piste.io/thumbs/la-plagne.jpg'
                }
            }
        });
    };
}(this));
