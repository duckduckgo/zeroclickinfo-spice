(function(env) {    
    env.ddg_spice_chuck_norris = function(api_result) {
        "use strict";

        if (api_result.type !== 'success') {
          return;
        }

        Spice.add({
            id: "chuck_norris",
            name: "Chuck Norris",
            data             : api_result.value,
            meta: {
                sourceUrl       : 'http://www.icndb.com',
                sourceName      : 'Internet Chuck Norris Database'
            },
            templates: {
                detail: Spice.chuck_norris.detail
            },
            
        });
    }
}(this));