(function(env) {

    // define some static variables for callback and helpers
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
        },
        MONTH = [
            "Jan.", "Feb.", "March", "April", "May", "June",
            "July", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
        ];

    // Compute the difference between now and the time of departure or arrival.
    function relativeTime(date, airportOffset) {

        // This is the time of departure or arrival (not sure why we're getting the difference).
        date = date.getTime() - (date.getTimezoneOffset() * MILLIS_PER_MIN);

        // This is the current time at the airport (in milliseconds).
        var now = new Date().getTime() + (airportOffset * MILLIS_PER_HOUR);

        return date - now;
    }

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
    }

    env.ddg_spice_airlines = function(api_result) {

        // store the user's airline and city search information
        var queriedAirlines =  null,
            sourceCity = null,
            destinationCity = null;

        // Check if we have anything returned.
        if (!api_result || !api_result.flightStatuses || !api_result.appendix || !api_result.appendix.airlines) {
            return;
        }

        // Extract carrier information from query
        var script = $('[src*="/js/spice/airlines/"]')[0],
            source = $(script).attr("src"),
            queryCarrier = decodeURIComponent(source.match(/airlines\/([^\/]+)/)[1]).toLowerCase();

        // Create dictionaries to convert FlightStat codes to ICAO codes/airline names
        var dictFlightStats = [];
        $.each(api_result.appendix.airlines, function(index, value) {
                dictFlightStats[value.fs] = {
                    "icao": value.icao,
                    "name": value.name
                };                
        });

        // Check if flight is an array or not.
        var flight = [];
        if (!($.isArray(api_result.flightStatuses))) {
            flight = [api_result.flightStatuses];
        } else {
            flight = api_result.flightStatuses;
        }

        // Create dictionaries to convert FlightStat codes to ICAO codes/airline names
        var dictFlightStats = [];
        $.each(api_result.appendix.airlines, function(index, value) {
                dictFlightStats[value.fs] = {
                    "icao": value.icao,
                    "name": value.name
                };                
        });

        // array of flights
        var results = [];

        // package up the flights into the result array
        for (var i = 0; i < flight.length; i++) {

            var airlineName = dictFlightStats[flight[i].carrierFsCode].name;
            var airlineCode = flight[i].carrierFsCode;
            var flightNumber = flight[i].flightNumber;

            // If this is a code-shared flight, we may not have the right
            // airline name/code information...try to find a better match
            if (airlineCode !== queryCarrier) {

                for (var j = 0; j < flight[i].codeshares.length; j++) {

                    if (flight[i].codeshares[j].fsCode.toLowerCase() === queryCarrier) {
                        airlineCode = flight[i].codeshares[j].fsCode;
                        airlineName = dictFlightStats[airlineCode].name;
                        flightNumber = flight[i].codeshares[j].flightNumber;

                        // we can break immediately if we find the matching code-share flight
                        break;
                    }
                }
            }

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
                airlineName: airlineName,
                airlineCode: airlineCode,
                flightNumber: flightNumber,
                departing: departing,
                arriving: arriving,
                departureDate: departureDate,
                arrivalDate: arrivalDate,
                scheduledDepartureDate: scheduledDepartureDate,
                scheduledArrivalDate: scheduledArrivalDate
            });

        }

        if (results.length === 0) {
            return Spice.failed('airlines');
        }

        Spice.add({
            data: results,
            id: "airlines",
            name: "Airlines",
            meta: {
                minItemsForModeSwitch: 3,
                sourceName: 'FlightStats',
                sourceUrl: "http://www.flightstats.com/go/FlightStatus/flightStatusByFlight.do?"
                    + "airlineCode=" + results[0].airlineCode 
                    + "&flightNumber=" + results[0].flightNumber,
                itemType: results.length === 1 ? "flight" : "flights by departure time" 
            },
            normalize: function(item) {

                return {
                    url: "http://www.flightstats.com/go/FlightStatus/flightStatusByFlight.do?"
                        + "airlineCode=" + item.airlineCode 
                        + "&flightNumber=" + item.flightNumber
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
                    content: Spice.airlines.content
                },
                variants: {
                    tile: 'xwide'
                }
            },
        });
    }
    
    // Add the date and time or departure or arrival.
    Spice.registerHelper("airline_time", function(isDeparture, arrivalDate, departureDate) {
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
            return hours + ":" + minutes + " " + suffix + " (" + MONTH[dateObject.getMonth()] + " " + dateObject.getDate() + ")";
        } else
            return hours + ":" + minutes + " " + suffix;
    });

    Spice.registerHelper("airline_status", function(flight, departureDate, arrivalDate, scheduledDeparture, scheduledArrival) {
        var result = onTime(flight, departureDate, arrivalDate, scheduledDeparture, scheduledArrival),
            ok_class = result[1] ? "tile__ok" : "tile__not";
        return '<div class="' + ok_class + '">' + result[0] + '</div>';
    });

}(this))
