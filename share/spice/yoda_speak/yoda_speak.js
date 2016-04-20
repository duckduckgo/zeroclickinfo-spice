(function (env) {
    "use strict";
    env.ddg_spice_yoda_speak = function(api_result) {

        if (!api_result || api_result.yodish === '' || api_result.error ) {
            return Spice.failed('yoda_speak');
        }

        Spice.add({
            id: "yoda_speak",
            name: "Answer",
            data: {
                title: api_result.yodish,
            },
            meta: {
                sourceName: "Yodish.com",
                sourceUrl: "http://www.yodajeff.com/pages/talk/yodish.shtml" 
            },
           
            templates: {
                group: 'text',
                options: {
                    content: Spice.yoda_speak.yoda_speak,
                    moreAt: true
                }
            }
        });
    };
}(this));
