(function (env) {
    "use strict";
    
    env.ddg_spice_skyscanner_flight_search = function(api_result) {

        // Validate the response (customize for your Spice)
        if (!api_result || api_result.error || api_result.Routes.length === 0) {
            return Spice.failed('skyscanner_flight_search');
        }
        
        jQuery.ajaxSetup({ cache: true });
        
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
        
        var origin_country = placesById[listOfRoutes[0].OriginId].Name;
        //console.log(listOfRoutes[0]);
        
        var build_flight_route = function (current_route, index, response) {
            var price = "";
            var price_age = "";
            var destination_city = "";
            var destination_city_image = "";
            var destination_airport = "";
            var origin_code = "";
            var destination_code = "";
            var quote_ref = "";
            var quote_date_time = "";
            var outbound_date = "";
            var return_date = "";
            var image_array = [];

            var current_route = listOfRoutes[index];
            var cityId = "SKY:" + placesById[current_route.DestinationId].CityId; 
            var countryId = "SKY:" + placesById[current_route.DestinationId].SkyscannerCode; 
            
            console.log("Getting data for: " + countryId);
            console.log("Is there an index? " + response.index[countryId]);
            
            if (response.index[countryId] >=0) {
                console.log("true");
                image_array = response.results[response.index[countryId]].images;
            } else {
                console.log("false");
            }
            
            //console.log("First image array for " + cityId + ": " + response.results[response.index[cityId]].images);
            //console.log("Second image array for " + cityId + ": " + image_array);

            
            if (Array.isArray(image_array) && image_array.length > 0) {
                destination_city_image = image_array[0].url;
            } else {
                destination_city_image = "http://www.skyscanner.net/images/opengraph.png";
            }

            price = current_route.Price; 
            price_age = current_route.QuoteDateTime;
            // can use CityName or Name here:
            destination_city = placesById[current_route.DestinationId].Name;
            destination_airport = placesById[current_route.DestinationId].SkyscannerCode;
            destination_code = destination_airport;
            origin_code = placesById[current_route.OriginId].SkyscannerCode;
            quote_ref = (current_route.QuoteIds) ? ((current_route.QuoteIds.length >1) ? current_route.QuoteIds[0]: current_route.QuoteIds) : '';
            quote_date_time = (quote_ref != '') ? quotesById[quote_ref].QuoteDateTime : "N/A";

            outbound_date = (quote_ref != '') ? quotesById[quote_ref].OutboundLeg.DepartureDate : "N/A";
            return_date = (quote_ref != '') ? quotesById[quote_ref].InboundLeg.DepartureDate : "N/A";

            return {
                flight_price: price,
                flight_price_age: price_age,
                flight_destination_city: destination_city,
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
        console.log("https://gateway.skyscanner.net/travel-api/v1/entities?external_ids=" + listOfCountryIds + "&enhancers=images&apikey=09fd8de5844d4b1d982a320ad5dee5b8");
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://gateway.skyscanner.net/travel-api/v1/entities?external_ids=" + listOfCountryIds + "&enhancers=images&apikey=09fd8de5844d4b1d982a320ad5dee5b8",
            "method": "GET",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "cf3cb5f2-92ff-15a0-3331-6b014e83abba"
            }
        };

        $.ajax(settings).success(function (response) {
            
            var flights = listOfRoutes.map(function(route,index) { return build_flight_route(route, index, response); });
            
            // Fail if no flights to show
            if (flights.length === 0) {
                return Spice.failed('No flights found');
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
                    primaryText: "Skyscanner's best deals from " + origin_country + "",
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
                    }
                },

                normalize: function(item) {
                    return {
                        disclaimer: "found " + moment(item.flight_price_age).fromNow() + " ago",
                        title: item.flight_destination_city,
                        image: item.flight_destination_city_image,
                        url: "http://partners.api.skyscanner.net/apiservices/referral/v1.0/GB/GBP/en-GB/" + item.flight_origin_code + "/" + item.flight_destination_code + "/" 
                            + moment(item.flight_outbound_date).format("YYYY-MM-DD") + "/" + moment(item.flight_return_date).format("YYYY-MM-DD") + "?apiKey=te1561648834359",
                        price: "from £" + item.flight_price,
                        altSubtitle: (moment(item.flight_return_date).diff(moment(item.flight_outbound_date), 'days') > 1) ? moment(item.flight_return_date).diff(moment(item.flight_outbound_date), 'days') + ' days' : " 1 day",
                        date: moment(item.flight_outbound_date).format('MMM Do') ,
                    };
                },
            });
            });
        });
    }
        
}(this));
