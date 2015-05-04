(function (env) {
    "use strict";
    env.ddg_spice_equaldex = function(api_result){

        if (!api_result || api_result.error || !DDG.getProperty(api_result, 'regions.region')) {
            return Spice.failed('equaldex');
        }
        
        // Data is stored in region object
        api_result = api_result.regions.region;

        Spice.add({
            id: "equaldex",
            name: "Equaldex",
            data: api_result,
            meta: {
                sourceName: "equaldex.com",
                sourceUrl: api_result.url
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
