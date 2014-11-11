(function (env) {
    "use strict";
    
    env.ddg_spice_vt_beer_trail = function(api_result) {
        
        //Validate the response 
        if (api_result.error) {
            return Spice.failed('vt_beer_trail');
        }
        
        //Render the response
        Spice.add({
            
            id: "vt_beer_trail",
            name: "VT Beer Trail",
            data: api_result,
            meta: {
                sourceName: "vtbeertrail.com",
                sourceUrl: 'http://www.vtbeertrail.com/data/vtbrewers.json'
            },
        });
    };
}(this));