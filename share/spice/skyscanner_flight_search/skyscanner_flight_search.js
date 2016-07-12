(function (env) {
    "use strict";
    
    
    

    env.ddg_spice_skyscanner_flight_search = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.Routes.length === 0) {
            return Spice.failed('skyscanner_flight_search');
        }
        
        var flights = [];
        var routes = api_result.Routes;
        var placesById = api_result.Places.reduce(function (result, place) { result[place.PlaceId] = place; return result; }, {});
        var quotes = api_result.Quotes;
        
        // iterate through the routes and build the flights array with:
        // price, destination, o/b date, i/b date and carrier
        
        for (var i=0; i < routes.length; i++) {
            var current = routes[i];
            var flight_price = "";
            var flight_destination = "";
            
            function findPlaceById(places, id) { 
                return places.PlaceId === id;
            }
            
            flight_price = current.Price; 
            flight_destination = placesById[current.DestinationId].Name;
            
            flights.push({
                price: flight_price,
                destination: flight_destination
            });
        }
        
        
        // Fail if no flights to show
        if (flights.length === 0) {
            return Spice.failed('No flights found');
        }
        
        // Render the response
        Spice.add({
            id: 'skyscanner_flight_search',

            // Customize these properties
            name: 'Flights',
            data: flights,
            meta: {
                sourceName: 'Skyscanner',
                sourceUrl: 'Skyscanner.net',
                total: flights,
                itemType: (flights.length === 1) ? 'Result' : 'Results'
            },
            normalize: function(item) {

                return {
                    // customize as needed for your chosen template
                    title: "£" + item.price,
                    subtitle: item.destination
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
