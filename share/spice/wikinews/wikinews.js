(function (env) {
    "use strict";
    env.ddg_spice_wikinews = function(api_result){

        if (api_result.error) {
            return Spice.failed('wikinews');
        }

        Spice.add({
            id: "wikinews",
            name: "Wikinews",
            data: api_result,
            meta: {
                sourceName: "wikinews.org",
                sourceUrl: 'https://en.wikinews.org/wiki/Main_Page'
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.wikinews.content,
                    moreAt: true
                }
            }
        });
    };s
}(this));