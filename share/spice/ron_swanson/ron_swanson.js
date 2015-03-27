(function (env) {
    "use strict";
    env.ddg_spice_ron_swanson = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('ron_swanson');
        }

        // Render the response
        Spice.add({
            id: "ron_swanson",
            name: "Ron Swanson Quote",
            data: { 
                title: function(){
                    return '"' + api_result.quote + '" - Ron Swanson';
                }()
            },
            meta: {
                sourceName: "Ron Swanson Quotes API",
                sourceUrl: 'https://github.com/jamesseanwright/ron-swanson-quotes'
            },
            templates: {
                group: 'text',
                options: {
                    moreAt: true
                }
            }
        });
    };
}(this));