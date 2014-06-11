!function(env) {
    "use strict";
    env.ddg_spice_chuck_norris = function(api_result) {
        if (!api_result || "success" !== api_result.type) {
            return Spice.failed("chuck_norris");
        }
        Spice.add({
            id: "chuck_norris",
            name: "Answer",
            data: api_result.value,
            meta: {
                sourceUrl: "http://www.icndb.com/the-jokes-2/",
                sourceName: "Internet Chuck Norris Database"
            },
            templates: {
                group: "base",
                options: {
                    content: Spice.chuck_norris.content,
                    moreAt: !0
                }
            }
        });
    };
}(this);