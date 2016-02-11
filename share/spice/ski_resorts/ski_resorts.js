// (function (env) {
//     "use strict";
//     env.ddg_spice_ski_resorts = function(api_result) {

//         // Validate the response (customize for your Spice)
//         if (!api_result || api_result.error) {
//             return Spice.failed('ski_resorts');
//         }

//         // Render the response
//         Spice.add({
//             id: "ski_resorts",

//             // Customize these properties
//             name: "Ski Resort",
//             data: api_result,
//             meta: {
//                 sourceName: "Piste.io",
//                 sourceUrl: 'http://www.piste.io/' + api_result.name
//             },
//             normalize: function(item) {
//                 return {
//                     // customize as needed for your chosen template
//                     title: api_result.title,
//                     subtitle: "Ski resort in " + api_result.country,
//                     image: 'http://www.piste.io/thumbs/' + api_result.name + '.jpg'
//                 };
//             },
//             templates: {
//                 group: 'info'
//             }
//         });
//     };
// }(this));

(function (env) {
    "use strict";
    env.ddg_spice_ski_resorts = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error) {
            return Spice.failed('ski_resorts');
        }

        var lon = (Math.round(api_result.location[0] * 100) / 100).toFixed(2);
        var lat = (Math.round(api_result.location[1] * 100) / 100).toFixed(2);
    
        DDG.require('maps', function() {
            Spice.add({
                id: "isslocation",
                name: "Ski Resort",
                model: 'Place',
 
                view: 'Map',
                data: [{
                    url: 'http://www.piste.io/' + api_result.name,
                    display_name: api_result.title,
                    name: api_result.title,
                    lon: lon,
                    lat: lat
                }],
                meta: {
                    zoomLevel: 6,
                    sourceName: "Piste.io",
                    sourceUrl: 'http://www.piste.io/' + api_result.name
                },
                normalize: function(item) {
 
                    return {
                        lon: lon,
                        lat: lat
                    };
                }
            });
        });
        
    };
}(this));
