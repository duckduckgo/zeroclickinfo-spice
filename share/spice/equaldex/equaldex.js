(function (env) {
    "use strict";
    env.ddg_spice_equaldex = function(api_result){

        if (!api_result) {
            return Spice.failed('equaldex');
        }

        Spice.add({
            id: "equaldex",
            name: "Answer",
            data: api_result,
            meta: {
                sourceName: "equaldex.com",
                sourceUrl: 'http://equaldex.com/'
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.equaldex.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
