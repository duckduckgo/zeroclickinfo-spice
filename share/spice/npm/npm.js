(function (env) {
   env.ddg_spice_npm = function(api_result){
        "use strict";

        if (api_result.error) {
            return;
        }

        Spice.add({
            id: "npm",
            name: "NPM",
            data: api_result,
            meta: {
                itemType: api_result.name + ' (' + api_result.version + ')',
                sourceName: "npmjs.org",
                sourceUrl: 'http://npmjs.org/package/' + api_result.name
            },
            templates: {
                detail: Spice.npm.detail
            }
        });
   };
})(this);