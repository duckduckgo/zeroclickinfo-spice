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
            var destination_city = "";
            var destination_airport = "";
            var quote_ref = "";
            var quote_date_time = "";
            var outbound_date = "";
            var return_date = "";
            
            if (current.Price) {
                price = current.Price; 
                destination_city = placesById[current.DestinationId].CityName;
                destination_airport = placesById[current.DestinationId].SkyscannerCode;
                
                quote_ref = (current.QuoteIds) ? ((current.QuoteIds.length >1) ? current.QuoteIds[0]: current.QuoteIds) : '';
            
                quote_date_time = (quote_ref != '') ? quotesById[quote_ref].QuoteDateTime : "N/A";
            
                outbound_date = (quote_ref != '') ? quotesById[quote_ref].OutboundLeg.DepartureDate : "N/A";
                return_date = (quote_ref != '') ? quotesById[quote_ref].InboundLeg.DepartureDate : "N/A";
            
                flights.push({
                    flight_price: price,
                    flight_destination_city: destination_city,
                    flight_destination_airport: destination_airport,
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

            // This is the result tab header
            name: 'Flights',
            // data to pass to the template
            data: flights,
            meta: {
                sourceName: 'Skyscanner',
                sourceUrl: 'Skyscanner.net',
                total: flights,
                // You can either show Results: or customised text (primaryText)
                itemType: (flights.length === 1) ? 'Result' : 'Results',
                primaryText: "Flights from Edinburgh to your destination",
                // add regex to retrieve destination from search query
                searchTerm: 'flights to <your destination>',
                sourceLogo: {
                    url: 'https://upload.wikimedia.org/wikipedia/en/9/90/SkyscannerLogo.png',
                    width: '70px',
               
                }
            },
            
            templates: {
                group: 'text',
                detail: false,
                item_detail: false,
                options: {
                    //footer: true,
                    dateBadge: true,
                },
                // use variants to modify the template's visual appearance, pre-determined css classes (or combinations of classes) from the DDG style guide
                variants: {
                    //tile: 'basic4',
                    tileTitle: '1line-small',
                    // snippet can be large or small (height of the tile)
                    tileSnippet: 'small',
                    tileSubtitle: '1line',
                    //tileFooter: '2line',
                    
                    //detail: 'dark'
                }
                // ariants don't suffice in customizing your templates' appearance, you may directly specify classes from the DDG style guide through the 
                // elClass property of templates. This feature is mainly used for specifying text size and color.
                // elClass {
                //    ...
                // }
            },
                  
            normalize: function(item) {
                return {
                    // customize as needed for your chosen template
                    icon: 'http://s1.apideeplink.com/images/airlines/BE.png',
                    title: item.flight_destination_city,
                    altSubtitle: (item.flight_destination_airport === item.flight_destination_city) ? ' ' : item.flight_destination_airport,
                    //subtitle: "Outbound: " + item.flight_outbound_date + ", return: " + item.flight_return_date,
                    description: "from £" + item.flight_price,
                    //footer: 'url here',
                    //dateBadge: item.flight_outbound_date
                };
            },
        });
    };
    
    
}(this));
