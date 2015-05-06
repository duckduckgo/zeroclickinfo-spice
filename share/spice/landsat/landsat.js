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
            normalize: function(data){
                return {
                    title: data.id,
                    subtitle: "Taken: " + data.date,
                    image: data.url
                };
            },
            templates: {
                group: 'media',
                options: {
                    moreAt: true
                }
            }
        });
    }

}(this));
