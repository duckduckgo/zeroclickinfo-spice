(function(env) {
    "use strict";
    env.ddg_spice_beer = function(api_result) {

        // Return if no book is returned
        if(!api_result || api_result.error) {
            return Spice.failed('beer');
        }


        
        Spice.add({
            id: "beer",
            name: "Beer",
            data: api_result.beers[0],
            meta: {
                sourceName: "Open Beer Database",
                sourceUrl: 'http://openbeerdatabase.com/'
            },
            templates: {
                group: 'base',
                options:{
                    content: Spice.beer.beer,
                    moreAt: false
                }
            }
        });
        
        
    }
}(this));
