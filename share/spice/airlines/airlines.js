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

        // Check if FlightStats returned anything
        if (!api_result || !api_result.flightStatuses || !api_result.appendix || !api_result.appendix.airlines) {
            return;
        }

        // extract parameters from the Flightstats request
        var script = $('[src*="/js/spice/airlines/"]')[0];
        var source = $(script).attr("src");
        var callParameters = decodeURIComponent(source).split('/');
        
        // determine the original date that we made an upstream request
        var originalRequestDayOfMonth = callParameters[8];
        var originalRequestHour = callParameters[9];

        // for every API request, we make an additional request to 
        // grab results for late-night arrivals from the night before and 
        // red eyes for the next day (relative to UTC)
        //
        // more broadly, this allows us to grab a larger window of flights
        var apiResponseDate = new Date(Date.UTC(api_result.request.date.year,
                                       api_result.request.date.month-1,
                                       api_result.request.date.day,
                                       originalRequestHour, 0, 0));

        // if this response is for the original same-day request...
        if (originalRequestDayOfMonth == apiResponseDate.getUTCDate()) {

            var apiRequestDate;

            //  and the current hour is before 3AM, get the previous day's flights as well
            //  (so we can show arrivals for late-night flights)
            if (originalRequestHour < 3) {
                apiRequestDate = new Date(apiResponseDate.getTime() - 24 * 60 * 60 * 1000);    

            // otherwise, get the next day's flights so that we have at least
            // 24 hours worth of flights even as the current day approaches an end
            } else {
                apiRequestDate = new Date(apiResponseDate.getTime() + 24 * 60 * 60 * 1000);
            }
            
            // prevent AJAX from appending a timestamp to the URL
            $.ajaxSetup({ cache: true });

            // make an additional upstream call 
            $.getScript("/js/spice/airlines/"
                    + callParameters[4] + "/"
                    + callParameters[5] + "/"
                    + apiRequestDate.getUTCFullYear() + "/"
                    + (apiRequestDate.getUTCMonth()+1) + "/"
                    + apiRequestDate.getUTCDate() + "/"
                    + originalRequestHour);
        }

        env.ddg_spice_airlines.display(api_result);
    },

    env.ddg_spice_airlines.display = function(api_result) {

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

            // if this flight arrived more than 3 hours ago, do not add it
            if (flight[i].operationalTimes.actualGateArrival) {

                var arrivalTime = new Date(flight[i].operationalTimes.actualGateArrival.dateUtc);

                if (Date.now() - arrivalTime.getTime() > 3 * 60 * 60 * 1000) {
                    continue;
                }
            }

            // if this flight is departing more than 24 hours into the future, do not add it
            if (flight[i].operationalTimes.scheduledGateDeparture) {

                var departureTime = new Date(flight[i].operationalTimes.scheduledGateDeparture.dateUtc);
                
                if (departureTime.getTime() - Date.now() > 24 * 60 * 60 * 1000) {
                    continue;
                }
            }

            var airlineName = dictFlightStats[flight[i].carrierFsCode].name;
            var airlineCode = flight[i].carrierFsCode;
            var flightNumber = flight[i].flightNumber;

            // If this is a code-shared flight, we may not have the right
            // airline name/code information...try to find a better match
            if (airlineCode !== queryCarrier && flight[i].codeshares) {

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
            allowMultipleCalls: true
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
