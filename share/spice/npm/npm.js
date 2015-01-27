(function (env) {
    "use strict";
    env.ddg_spice_npm = function(api_result){

        if (!api_result || api_result.error) {
            return Spice.failed('npm');
        }

        Spice.add({
            id: "npm",
            name: "Software",
            data: api_result,
            meta: {
                sourceName: "npmjs.org",
                sourceUrl: 'http://npmjs.org/package/' + api_result.name
            },
            
            normalize: function(item) {
                return {
                    title: item.name + " " + item.version,
                    subtitle: item.description
                }  
            },

            templates: {
                group: 'text',
                options: {
                    content: Spice.npm.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
