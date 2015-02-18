(function (env) {
    "use strict";
    env.ddg_spice_bla = function(api_result){
        if (api_result.error) {
            return Spice.failed('bla');
        }
        Spice.add({
            id: "bla",
            name: "Events",
            data: api_result.events,
            meta: {
                sourceName: "getevents.co",
                sourceUrl: 'http://getevents.co'
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.bla.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
