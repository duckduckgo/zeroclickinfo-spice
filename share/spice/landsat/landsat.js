(function(env){
    "use strict";
    env.ddg_spice_landsat = function(api_result){

        if (!api_result.url) {
            return Spice.failed('landsat');
        }

        Spice.add({
            id: 'landsat',
            data: api_result,
            name: 'Landsat',
            meta: {
                sourceUrl: 'https://data.nasa.gov',
                sourceName: 'NASA',
                sourceIcon: true
            },
            templates: {
                group: 'base',
                options: {
                    content: Spice.landsat.content,
                    moreAt: true
                }
            }
        });
        
        if(is_mobile) {
            document.getElementsByClassName("landsat--date")[0].style.display='none';
        }
        
    }

}(this));
