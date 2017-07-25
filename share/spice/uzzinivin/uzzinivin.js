(function (env) {
    "use strict";

    env.ddg_spice_uzzinivin = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || !api_result.found) {
            return Spice.failed('uzzinivin');
        }

        // Render the response
        Spice.add({
            id: 'uzzinivin',

            // Customize these properties
            name: 'UzziniVIN',
            data: api_result,
            meta: {
                sourceName: 'uzzinivin.lv',
                sourceUrl: api_result.infourl
            },
          templates: {
                group: 'text',
                options: {
                    title_content: Spice.uzzinivin.uzzinivin,
                    moreAt: true
                }
            }
        });
    };
}(this));