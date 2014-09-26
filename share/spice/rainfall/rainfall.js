(function (env) {
    "use strict";
    env.ddg_spice_npm = function(api_result){
        
        
        if (api_result.error) {
            return Spice.failed('rainfall');
        }
      
        Spice.add({
            id: "rainfall",
            name: "Weather",
            data: api_result,
            meta: {
                sourceName: "climatedataapi.worldbank.org",
                //sourceUrl: '' + api_result.name
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.npm.content,
                    moreAt: true
                }
            }
        });
    };
}(this));
