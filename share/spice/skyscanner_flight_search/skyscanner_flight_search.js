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
        var quotesById = api_result.Quotes.reduce(function (result, quote) { result[quote.QuoteId] = quote; return result; }, {});
        
        // iterate through the routes and build the flights array with:
        // price, destination, o/b date, i/b date and carrier
        
        for (var i=0; i < routes.length; i++) {
            var current = routes[i];
            var price = "";
            var destination = "";
            var quote_ref = "";
            var quote_date_time = "";
            var outbound_date = "";
            var return_date = "";
            
            if (current.Price) {
                price = current.Price; 
                destination = placesById[current.DestinationId].Name;
                quote_ref = (current.QuoteIds) ? ((current.QuoteIds.length >1) ? current.QuoteIds[0]: current.QuoteIds) : '';
            
                quote_date_time = (quote_ref != '') ? quotesById[quote_ref].QuoteDateTime : "N/A";
            
                outbound_date = (quote_ref != '') ? quotesById[quote_ref].OutboundLeg.DepartureDate : "N/A";
                return_date = (quote_ref != '') ? quotesById[quote_ref].InboundLeg.DepartureDate : "N/A";
            
                flights.push({
                    flight_price: price,
                    flight_destination: destination,
                    flight_quote: quote_ref,
                    flight_datetime: quote_date_time,
                    flight_outbound_date: outbound_date,
                    flight_return_date: return_date
                });
            }
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
                    title: "£" + item.flight_price,
                    subtitle: item.flight_destination,
                    description: "Outbound: " + item.flight_outbound_date + ", return: " + item.flight_return_date 
                };
            },
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                variants: {
                    tile: 'basic1',
                    tileTitle: '1line',
                    tileFooter: '2line',
                    tileSnippet: 'large'
                },
            }
        });
    };
    
    
}(this));
