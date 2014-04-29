(function (env) {
    "use strict";
    env.ddg_spice_npm = function(api_result){

        if (api_result.error) {
            return Spice.failed('npm');
        }

        Spice.add({
            id: "npm",
            name: "NPM",
            data: api_result,
            meta: {
                sourceName: "npmjs.org",
                sourceUrl: 'http://npmjs.org/package/' + api_result.name
            },
            templates: {
                detail: Spice.npm.detail
            }
        });
    };
}(this));
