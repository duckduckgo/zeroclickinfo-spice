(function (env) {
    "use strict";
    env.ddg_spice_coursera = function(api_result){

        if (api_result.error) {
            return Spice.failed('coursera');
        }

        Spice.add({
            id: "coursera",

            name: "Coursera",
            data: api_result.elements,
            meta: {
                sourceName: "Coursera.org",
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.coursera.content,
                    moreAt: false
                }
            }
        });
    };
}(this));
