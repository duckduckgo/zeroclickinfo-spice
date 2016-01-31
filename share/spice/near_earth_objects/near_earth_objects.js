(function (env) {
    "use strict";
    env.ddg_spice_near_earth_objects = function(api_result) {

        if (!api_result || !api_result.near_earth_objects || api_result.near_earth_objects.length === 0 || api_result.element_count === 0) {
            return Spice.failed('near_earth_objects');
        }
        
        // Put all NEOs into a single array
        var neo_list = [];
        for (var obj in api_result.near_earth_objects) {
            if (api_result.near_earth_objects.hasOwnProperty(obj)) {
                neo_list = neo_list.concat(api_result.near_earth_objects[obj]);
            }
        }
        
        // Render the response
        Spice.add({
            id: "near_earth_objects",
            name: "Answer",
            data: neo_list,
            
            meta: {
                sourceName: 'NASA',
                sourceUrl: 'http://neo.jpl.nasa.gov/',
                itemType: (neo_list.length === 1) ? 'near earth object (asteroid)' : 'near earth objects (asteroids)'
            },
            
            normalize: function(item) {
                // Format numbers first
                var distMiles = DDG.commifyNumber(DDG.abbrevNumber(item.close_approach_data[0].miss_distance.miles));
                var distKm = DDG.commifyNumber(DDG.abbrevNumber(item.close_approach_data[0].miss_distance.kilometers));
                var maxSizeMeters = DDG.commifyNumber(Math.round(item.estimated_diameter.meters.estimated_diameter_max));
                var maxSizeFeet = DDG.commifyNumber(Math.round(item.estimated_diameter.feet.estimated_diameter_max));
                
                return {
                    url: item.nasa_jpl_url,
                    title: item.name,
                    altSubtitle: 'SPK-ID: ' + item.neo_reference_id,
                    subtitle: 'Approach date: ' + item.close_approach_data.close_approach_date,
                    description: 'Has a diameter of up to ' + maxSizeMeters + ' meters (' + maxSizeFeet + ' feet) and will miss earth by ' + distKm + ' km (' + distMiles + ' miles).',
                };
            },
            
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                variants: {
                    tileSubtitle: "1line"
                }
            }
        });
    };
}(this));
