(function (env) {
    "use strict";
    
    env.ddg_spice_skyscanner_flight_search = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.Routes.length === 0) {
            return Spice.failed('skyscanner_flight_search');
        }
                
        // get the currency and the format (symbol on the left or on the right)
        var currency_code = api_result.Currencies[0].Code;
        var currency_symbol = api_result.Currencies[0].Symbol;
        var currency_symbol_left = api_result.Currencies[0].SymbolOnLeft;
        
        // get all the routes, places and quotes
        var routes = api_result.Routes;
        var placesById = api_result.Places.reduce(function (result, place) { result[place.PlaceId] = place; return result; }, {});
        var quotesById = api_result.Quotes.reduce(function (result, quote) { result[quote.QuoteId] = quote; return result; }, {});
        
        // building list of routes from results by sorting them by price, removing any without price and limiting the number to 10
        var listOfRoutes = routes.filter(function (r){return r.Price;}).sort(function(r1, r2){return r1.Price - r2.Price;}).slice(0,10);
        // var listOfRoutes = routes.filter(function (r){return r.Price;}).sort(function(r1, r2){return r1.Price - r2.Price;});

        var listOfCityIds = listOfRoutes.map(function(route){
            return "SKY%3A" + placesById[route.DestinationId].CityId;    
        });
        
        var listOfCountryIds = listOfRoutes.map(function(route){
            return "SKY%3A" + placesById[route.DestinationId].SkyscannerCode;    
        });
        
        var origin_country = (placesById[listOfRoutes[0].OriginId].Type === "Station") ? placesById[listOfRoutes[0].OriginId].CountryName : placesById[listOfRoutes[0].OriginId].Name;
        
        var build_flight_route = function (current_route, index, response) {
            var price = "";
            var price_age = "";
            var destination_city_name = "";
            var destination_country = "";
            var destination_airport = "";
            var destination_code = "";
            var destination_quote_ref = "";
            var destination_city_image = "";
            var origin_code = "";
            var quote_ref = "";
            var quote_date_time = "";
            var outbound_date = "";
            var return_date = "";
            var image_array = [];

            var current_route = listOfRoutes[index];
            var cityId = "SKY:" + placesById[current_route.DestinationId].CityId; 
            var countryId = "SKY:" + placesById[current_route.DestinationId].SkyscannerCode; 
            
            if (response.index[countryId] >=0) {
                image_array = response.results[response.index[countryId]].images;
            } 
            
            if (Array.isArray(image_array) && image_array.length > 0) {
                destination_city_image = image_array[0].url + "?crop=411px:187px&quality=100";
            } else {
                destination_city_image = "http://res.freestockphotos.biz/pictures/8/8453-a-blue-sky-with-white-clouds-pv.jpg";
            }

            price = current_route.Price; 
            price_age = current_route.QuoteDateTime;
            
            quote_ref = (current_route.QuoteIds) ? ((current_route.QuoteIds.length >1) ? current_route.QuoteIds[0]: current_route.QuoteIds) : '';
            // we're using the quote destination ref rather than the route destination as it specifies which airport (the routes ref only gives the city)
            destination_quote_ref = quotesById[quote_ref].OutboundLeg.DestinationId;
            destination_code = placesById[destination_quote_ref].SkyscannerCode;
            destination_city_name = (placesById[destination_quote_ref].Type == "Station") ? placesById[destination_quote_ref].CityName : placesById[destination_quote_ref].CityName;
            destination_country = (placesById[destination_quote_ref].Type == "Country") ? placesById[destination_quote_ref].Name : placesById[destination_quote_ref].CountryName;
            origin_code = placesById[current_route.OriginId].SkyscannerCode;
            quote_date_time = (quote_ref != '') ? quotesById[quote_ref].QuoteDateTime : "N/A";

            outbound_date = (quote_ref != '') ? quotesById[quote_ref].OutboundLeg.DepartureDate : "N/A";
            return_date = (quote_ref != '') ? quotesById[quote_ref].InboundLeg.DepartureDate : "N/A";

            
            return {
                flight_price: price,
                flight_price_age: price_age,
                flight_quote_ref: quote_ref,
                flight_destination_quote_ref: destination_quote_ref,
                flight_destination_city_name: destination_city_name,
                flight_destination_country: destination_country,
                flight_destination_city_image: destination_city_image,
                flight_destination_airport: destination_airport,
                flight_destination_code: destination_code,
                flight_origin_code: origin_code,
                flight_quote: quote_ref,
                flight_datetime: quote_date_time,
                flight_outbound_date: outbound_date,
                flight_return_date: return_date
            };
        }
          
        $.getJSON('/js/spice/skyscanner_images/' + listOfCountryIds, function(response) {
            var flights = listOfRoutes.map(function(route,index) { return build_flight_route(route, index, response); });
            
            // Fail if no flights to show
            if (flights.length === 0) {
                return Spice.failed('skyscanner_flight_search');
            }
        
            // Render the response
            DDG.require('moment.js', function(){
                Spice.add({
                id: 'skyscanner_flight_search',
                // This is the result tab header
                name: 'Flights',
                // data to pass to the template
                data: flights,
                meta: {
                    //itemType: 'Results ' + l('Results'),
                    sourceIcon: true,
                    sourceName: 'Skyscanner',
                    sourceUrl: 'http://skyscanner.net',
                    total: flights,
                    // You can either show Results: or customised text (primaryText)
                    //itemType: (flights.length === 1) ? 'Result' : 'Results',
                    primaryText: "Skyscanner's best deals from " + origin_country ,
                    // add regex to retrieve destination from search query
                    searchTerm: 'flights to destination_city',
                },

                templates:{
                    group: 'media',
                    detail: false,
                    item_detail: false,
                    options: {
                        description: false,
                        footer: Spice.skyscanner_flight_search.footer,
                    },
                    variants: {
                        tile: 'wide',
                        tileTitle: '1line-large'
                    } 
                },

                normalize: function(item) {
                    return {
                        image: item.flight_destination_city_image,
                        title: item.flight_destination_city_name + " (" + item.flight_destination_code + ")",
                        altSubtitle: item.flight_destination_country,
                        description: moment(item.flight_outbound_date).format('ddd D MMM') + " to " + moment(item.flight_return_date).format('ddd D MMM'),             
                        duration: (moment(item.flight_return_date).diff(moment(item.flight_outbound_date), 'days') > 1) ? moment(item.flight_return_date).diff(moment(item.flight_outbound_date), 'days') + ' nights' : " 1 day",
                        price: (currency_symbol_left) ? "from " + currency_symbol + item.flight_price : "from " + item.flight_price + " " + currency_symbol,
                        priceAge: moment(item.flight_price_age).fromNow(),
                        url: "http://partners.api.skyscanner.net/apiservices/referral/v1.0/GB/" + currency_code + "/en-GB/" + item.flight_origin_code + "/" + item.flight_destination_code + "/" 
                            + moment(item.flight_outbound_date).format("YYYY-MM-DD") + "/" + moment(item.flight_return_date).format("YYYY-MM-DD") + "?apiKey=te1561648834359",
                    };
                },
            }); 
            });
        });
    }
        
}(this));
