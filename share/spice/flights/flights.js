(function(env) {

    // define some static globals
    // used in callback and helpers
    var MILLIS_PER_MIN = 60000,
        MILLIS_PER_HOUR = MILLIS_PER_MIN * 60,
        STATUS = {
            "S": "Scheduled",
            "A": "In the air",
            "U": "Unknown status",
            "R": "Redirected flight",
            "L": "Landed",
            "D": "Diverted",
            "C": "Cancelled",
            "NO": "Not Operational",
            "DN": "Data Needed"
        };

    env.ddg_spice_flights = function(api_result) {
        "use strict";

        // Check if we have anything returned.
        if (!api_result || !api_result.flightStatuses) {
            return Spice.failed('flights');
        }
        
        // Get airline information to filter the results
        var script = $('[src*="/js/spice/flights/"]')[0],
            source = $(script).attr("src"),
            match  = source.match(/\/js\/spice\/flights\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)/),
            queriedAirlines = match[1].split('%2C');
            
        // Create dictionaries to convert FlightStat codes to ICAO codes/airline names
        var dictFlightStats = [];
        for (var dictIndex = 0; dictIndex < api_result.appendix.airlines.length; dictIndex++) {
            dictFlightStats[api_result.appendix.airlines[dictIndex].fs] = {
                "icao": api_result.appendix.airlines[dictIndex].icao,
                "name": api_result.appendix.airlines[dictIndex].name
            };
        }
                
        // Check if flight is an array or not.
        var flight = [];
        if (!($.isArray(api_result.flightStatuses))) {
            flight = [api_result.flightStatuses];
        } else {
            flight = api_result.flightStatuses;
        }

        // array of flights
        var results = [];

        // package up the flights into the result array
        for (var i = 0; i < flight.length; i++) {
                   
            // compile all airline and codeshare codes for each returned flight
            var carrierCodes = [{"fsCode": flight[i].carrierFsCode, "flightNumber": flight[i].flightNumber}];
            if (flight[i].codeshares) {
                for (var codeShareIndex = 0; codeShareIndex < flight[i].codeshares.length; codeShareIndex++) {
                    carrierCodes.push(flight[i].codeshares[codeShareIndex]);
                }
            }
            
            // if the user's queried airline appears in the results, add the results
            for (var carriersIndex = 0; carriersIndex < carrierCodes.length; carriersIndex++) {
                           
                if (queriedAirlines.indexOf(dictFlightStats[carrierCodes[carriersIndex].fsCode].icao) !== -1) {

                    var departureDate =
                        (flight[i].operationalTimes.actualGateDeparture 
                            && flight[i].operationalTimes.actualGateDeparture.dateLocal)
                        || (flight[i].operationalTimes.estimatedGateDeparture
                            && flight[i].operationalTimes.estimatedGateDeparture.dateLocal)
                        || (flight[i].operationalTimes.scheduledGateDeparture
                            && flight[i].operationalTimes.scheduledGateDeparture.dateLocal)
                        || flight[i].operationalTimes.flightPlanPlannedDeparture.dateLocal;

                    departureDate = DDG.getDateFromString(departureDate.toString());

                    var arrivalDate =
                        (flight[i].operationalTimes.actualGateArrival 
                            && flight[i].operationalTimes.actualGateArrival.dateLocal)
                        || (flight[i].operationalTimes.estimatedGateArrival
                            && flight[i].operationalTimes.estimatedGateArrival.dateLocal)
                        || (flight[i].operationalTimes.scheduledGateArrival
                            && flight[i].operationalTimes.scheduledGateArrival.dateLocal)
                        || flight[i].operationalTimes.flightPlanPlannedArrival.dateLocal;
                    
                    arrivalDate = DDG.getDateFromString(arrivalDate.toString());                    

                    var scheduledDepartureDate = 
                        (flight[i].operationalTimes.scheduledGateDeparture 
                            && flight[i].operationalTimes.scheduledGateDeparture.dateLocal)
                        || flight[i].operationalTimes.flightPlanPlannedDeparture.dateLocal;
                    
                    scheduledDepartureDate = DDG.getDateFromString(scheduledDepartureDate.toString());
                    
                    var scheduledArrivalDate =
                    (flight[i].operationalTimes.scheduledGateArrival 
                        && flight[i].operationalTimes.scheduledGateArrival.dateLocal)
                    || flight[i].operationalTimes.flightPlanPlannedArrival.dateLocal;
                    
                    scheduledArrivalDate = DDG.getDateFromString(scheduledArrivalDate.toString());

                    // Get the weekday and the day.
                    var dateObject = new Date(departureDate);
                    var date = dateObject.toDateString();
                    date = date.split(" ");

                    var departing = {
                        airportTimezone: "0",
                        airport: flight[i].departureAirportFsCode,
                        terminal: (flight[i].airportResources && flight[i].airportResources.departureTerminal) || "<span class='na'>N/A</span>",
                        gate: (flight[i].airportResources && flight[i].airportResources.departureGate) || "<span class='na'>N/A</span>",
                        isDeparted: true,
                        weekday: date[0].toUpperCase(),
                        day: date[2]
                        },
                        
                        arriving = {
                            airportTimezone: "0",
                            airport: flight[i].arrivalAirportFsCode,
                            terminal: (flight[i].airportResources && flight[i].airportResources.arrivalTerminal) || "<span class='na'>N/A</span>",
                            gate: (flight[i].airportResources && flight[i].airportResources.arrivalGate) || "<span class='na'>N/A</span>",
                            isDeparted: false
                        };

                    results.push({
                        flight: flight[i],
                        airlineName: dictFlightStats[carrierCodes[carriersIndex].fsCode].name,
                        flightNumber: carrierCodes[carriersIndex].flightNumber,
                        departing: departing,
                        arriving: arriving,
                        departureDate: departureDate,
                        arrivalDate: arrivalDate,
                        scheduledDepartureDate: scheduledDepartureDate,
                        scheduledArrivalDate: scheduledArrivalDate
                    });

                    break;
                }        
            }                   
        }

        if (results.length === 0) {
            return Spice.failed('flights');
        }

        // Display.
        Spice.add({
            data: results,
            id: "flights",
            name: "Flights",
            meta: {
                minItemsForModeSwitch: 3,
                sourceName: 'FlightStatus',
                sourceUrl: "http://www.flightstats.com/",
                itemType: "flights by departure time" 
            },
            normalize: function(item) {
                return {
                    url: "http://www.flightstats.com/"
                }
            },
            sort_fields: {
                departureDate: function(a, b) {
                    a = +new Date(a.departureDate);
                    b = +new Date(b.departureDate);
                    return ((a < b) ? -1 : (a > b ? 1 : 0));
                }
            },
            sort_default: 'departureDate',
            templates: {
                group: 'base',
                detail: false,
                options: {
                    content: Spice.flights.content,
                    variant: 'xwide'
                }
            },
        });
    };

    // Compute the difference between now and the time of departure or arrival.
    function relativeTime(date, airportOffset) {
        // This is the time of departure or arrival (not sure why we're getting the difference).
        date = date.getTime() - (date.getTimezoneOffset() * MILLIS_PER_MIN);

        // This is the current time at the airport (in milliseconds).
        var now = new Date().getTime() + (airportOffset * MILLIS_PER_HOUR);

        return date - now;
    };

    // Convert the time from milliseconds to hours and minutes.
    function toTime(delta) {
        var time = "",
            hours = Math.floor(Math.abs(delta / MILLIS_PER_HOUR)),
            minutes = Math.floor(Math.abs((delta % MILLIS_PER_HOUR) / MILLIS_PER_MIN));

        if (0 < hours) {
            time += hours + " hrs ";
        }
        if (0 < minutes) {
            time += minutes + " mins ";
        }

        if(delta === 0) {
            return "now";
        } else if(delta > 0) {
            return "in " + time;
        } else {
            return time + "ago";
        }
    };

    // Check when the plane will depart (or if it has departed).
    Handlebars.registerHelper("airline_status", function(airportOffset, isDeparture) {
        var dateObject = arrivalDate;
        if(isDeparture) {
            dateObject = departureDate;
        }

        var delta = relativeTime(dateObject, airportOffset);

        if(isDeparture) {
            if(delta === 0) {
                return "Departing";
            } else if(delta > 0) {
                return "Departs";
            } else {
                return "Departed";
            }
        } else {
            if(delta === 0) {
                return "Arriving";
            } else if(delta > 0) {
                return "Arrives";
            } else {
                return "Arrived";
            }
        }
    });

    // Add the date and time or departure or arrival.
    Handlebars.registerHelper("airline_time", function(isDeparture, arrivalDate, departureDate) {
        var dateObject = new Date(arrivalDate);
        if(isDeparture) {
            dateObject = new Date(departureDate);
        }

        var hours = dateObject.getHours(),
            minutes = dateObject.getMinutes(),
            date = dateObject.toDateString();

        date = date.substring(0, date.lastIndexOf(" "));

        // AM or PM?
        var suffix = (hours >= 12) ? "PM" : "AM";

        // Convert to 12-hour time.
        if(hours > 12) {
            hours -= 12;
        } else if(hours === 0) {
            hours = 12;
        }

        // Add leading zeroes.
        minutes = minutes < 10 ? "0" + minutes : minutes;

        if ((arrivalDate.getDate() != departureDate.getDate()) && (!isDeparture)) {
            return hours + ":" + minutes + " " + suffix + " (" + (dateObject.getMonth()+1) + "/" + dateObject.getDate() + ")";
        } else
            return hours + ":" + minutes + " " + suffix;
    });

    // Check if the airplane is on-time or delayed.
    function onTime(flight, departureDate, arrivalDate, scheduledDeparture, scheduledArrival) {
        
        var deltaDepart = new Date(departureDate) - scheduledDeparture,
            deltaArrive = new Date(arrivalDate) - scheduledArrival;

        if (flight.status === "A" || flight.status === "S") {
            if (MILLIS_PER_MIN * 5 < deltaDepart && MILLIS_PER_MIN * 5 < deltaArrive) {
                return ["Delayed", false];
            } else {
                return ["On Time", true];
            }
        }
        return [STATUS[flight.status], true];
    };

    Handlebars.registerHelper("status", function(flight, departureDate, arrivalDate, scheduledDeparture, scheduledArrival) {
        var result = onTime(flight, departureDate, arrivalDate, scheduledDeparture, scheduledArrival),
            ok_class = result[1] ? "tile__ok" : "tile__not";
        return '<div class="' + ok_class + '">' + result[0] + '</div>';
    });

}(this))
