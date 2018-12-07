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
        var result_text = (neo_list.length === 1) ? ' near-Earth object (asteroid)' : ' near-Earth objects (asteroids)';
        Spice.add({
            id: "near_earth_objects",
            name: "Answer",
            data: neo_list,
            signal: 'high',
            
            meta: {
                sourceName: 'NASA',
                sourceUrl: 'http://neo.jpl.nasa.gov/',
                primaryText: 'Showing ' + neo_list.length + result_text,
            },
            
            sort_fields: {
                approach_date: function(a, b) {
                    return parseInt(a.close_approach_data[0].epoch_date_close_approach) < parseInt(b.close_approach_data[0].epoch_date_close_approach) ? -1 : 1;
                },
                distance: function(a, b) {
                    return parseInt(a.close_approach_data[0].miss_distance.miles) < parseInt(b.close_approach_data[0].miss_distance.miles) ? -1 : 1;
                }
            },
            sort_default: 'approach_date',
            
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
                    subtitle: 'Approach date: ' + item.close_approach_data[0].close_approach_date,
                    description: 'Has a diameter of up to ' + maxSizeMeters + ' meters (' + maxSizeFeet + ' feet) and will miss Earth by ' + distKm + ' km (' + distMiles + ' miles).',
                };
            },
            
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                variants: {
                    tileTitle: "1line-large",
                    tileSubtitle: "1line"
                }
            }
        });
    };
}(this));
