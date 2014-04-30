(function(env) {
    "use strict";    
    env.ddg_spice_chuck_norris = function(api_result) {

        if (!api_result || api_result.type !== 'success') {
          return;
        }

        Spice.add({
            id: "chuck_norris",
            name: "Chuck Norris",
            data             : api_result.value,
            meta: {
                sourceUrl       : 'http://www.icndb.com/the-jokes-2/',
                sourceName      : 'Internet Chuck Norris Database'
            },
            templates: {
                group: 'info',
                options: {
                    content: Spice.chuck_norris.content
                }
            }
        });
    }
}(this));