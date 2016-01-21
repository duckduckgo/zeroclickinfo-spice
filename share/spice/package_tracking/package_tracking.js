(function (env) {
    "use strict";
    env.ddg_spice_package_tracking = function(api_result){

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('package_tracking');
        }

        // Render the response
        Spice.add({
            id: "package_tracking",

            // Customize these properties
            name: "Answer",
            //data: api_result,
            data: {
                title: api_result.c,  
                image: DDG.get_asset_path('package_tracking', 'logos/' + api_result.c + '.png')
            },
            //meta: {
               // #sourceName: "Example.com",
               //sourceUrl: 'http://example.com/url/to/details/' + api_result.name
            //},
           // normalize: function(item) {
           //     return {
                    // customize as needed for your chosen template
                    //title: api_result.title,
                    //subtitle: api_result.subtitle,
                   // image: api_result.icon
           //     };
           // },
            templates: {
                group: 'info',
               // options: {
                    //content: Spice.package_tracking.content,
                    //moreAt: true
               // }
            }
        });
    };
}(this));
