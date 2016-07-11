(function (env) {
    "use strict";

    env.ddg_spice_skyscanner_flight_search = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.Routes.length === 0) {
            return Spice.failed('skyscanner_flight_search');
        }

        // Render the response
        Spice.add({
            id: 'skyscanner_flight_search',

            // Customize these properties
            name: 'Flights',
            data: api_result.Routes,
            meta: {
                sourceName: 'Skyscanner',
                sourceUrl: 'Skyscanner.net',
                total: api_result.Routes,
                itemType: (api_result.Routes.length === 1) ? 'Result' : 'Results'
            },
            normalize: function(item) {
                var destination = "";
                
                for(var i=0; i < api_result.Places.length; i++){
                    if (api_result.Places[i].PlaceId === item.DestinationId) {
                        
                        destination = api_result.Places[i].Name;
                    }
                }
                return {
                    // customize as needed for your chosen template
                    title: "£" + item.Price,
                    subtitle: destination
                };
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,                
                variants: {
                    tileTitle: "3line-small",
                    tileFooter: "3line"
                }
            }
        });
    };
    
    
}(this));
