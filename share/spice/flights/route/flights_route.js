(function(env) {

    var ddg_spice_flights = {

        path: "/js/spice/flights",
        id: 'route',

        // store the user's airline and city search information
        queriedAirlines: null,
        sourceCity: null,
        destinationCity: null,

        // define some static variables for callback and helpers
        MILLIS_PER_MIN: 60000,
        MILLIS_PER_HOUR: this.MILLIS_PER_MIN * 60,
        STATUS: {
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


        // this function parses the initial query and sends out additional queries
        // as necessary for cities with multiple airports
        route: function(api_result) {
            "use strict";

            // prevent jQuery from appending "_={timestamp}" in our url when we use $.getScript
            $.ajaxSetup({ cache: true });

            // Get the original query to continue polling for other potential airports
            // and for filtering results by airline
            var script = $('[src*="/js/spice/flights/route/"]')[0],
                source = $(script).attr("src"),
                match  = source.match(/\/js\/spice\/flights\/route\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)/),
                queriedSrcAirports = match[2].split('%2C'),
                queriedDstAirports = match[3].split('%2C');

            this.queriedAirlines = match[1].split('%2C');
            this.sourceCity = match[10].replace('%2B', "+");
            this.destinationCity = match[11].replace('%2B', "+");

            // create all remaining source/destination pairs that have not yet been polled for
            for (var srcCounter = 0; srcCounter < queriedSrcAirports.length; srcCounter++) {

                for (var dstCounter = 0; dstCounter < queriedDstAirports.length; dstCounter++) {

                    // skip the first pair because the initial spice-to already
                    // obtained this result
                    if (srcCounter === 0 && dstCounter === 0)
                        continue;

                    $.getScript(this.path + "/route_helper/"
                                + queriedSrcAirports[srcCounter] + "/"
                                + queriedDstAirports[dstCounter] + "/arr/"
                                + match[6] + "/" + match[7] + "/" + match[8] +
                                "/" + match[9]);
                }
            }

            // Check if we have anything returned.
            if (!api_result || !api_result.flightStatuses) {
                return Spice.failed('route');
            }

            this.display(api_result);
        },


        // this helper function allows us to query for multiple airports with the
        // same city name; for example, New York maps to JFK and LGA
        route_helper: function(api_result) {
            "use strict";

            // Check if we have anything returned.
            if (!api_result || !api_result.flightStatuses) {
                return;
            }

            this.display(api_result);
        },


        // this function displays flight results; much of this code is copied from the
        // "airlines" spice
        display: function(api_result) {

            // Check if we have anything returned.
            if (!api_result || !api_result.flightStatuses || !api_result.appendix.airlines) {
                return;
            }

            // Create dictionaries to convert FlightStat codes to ICAO codes/airline names
            var dictFlightStats = {};
            $.each(api_result.appendix.airlines, function(index, value) {
                dictFlightStats[value.fs] = {
                    "icao": value.icao,
                    "name": value.name,
                };
            });

            // Create dictionaries to convert FlightStat codes to ICAO codes/airline names
            var dictAirportStats = {};
            $.each(api_result.appendix.airports, function(index, value) {
                dictAirportStats[value.fs] = value;
            });

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

                    $.each(flight[i].codeshares, function(codeShareIndex, flightCodeShare) {
                        carrierCodes.push(flightCodeShare);
                    });

                }

                // this loop iterates through all codeshared codes for the current flight result
                // once we find a matching carrier code, we break out of this loop
                for (var carriersIndex = 0; carriersIndex < carrierCodes.length; carriersIndex++) {

                    if (this.queriedAirlines.indexOf(dictFlightStats[carrierCodes[carriersIndex].fsCode].icao) !== -1) {

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

                        function not_empty(value) {
                            return value !== undefined && value !== '';
                        }

                        var departing_airport = dictAirportStats[flight[i].departureAirportFsCode];
                        var departing_location = [
                            departing_airport.city,
                            departing_airport.stateCode,
                            departing_airport.countryCode
                        ].filter(not_empty).join(', ');

                        var arriving_airport = dictAirportStats[flight[i].arrivalAirportFsCode];
                        var arriving_location = [
                            arriving_airport.city,
                            arriving_airport.stateCode,
                            arriving_airport.countryCode
                        ].filter(not_empty).join(', ');

                        var departing = {
                                airportTimezone: "0",
                                airport: departing_airport,
                                location: departing_location,
                                terminal: (flight[i].airportResources && flight[i].airportResources.departureTerminal) || "N/A",
                                gate: (flight[i].airportResources && flight[i].airportResources.departureGate) || "N/A",
                                isDeparted: true,
                                departureDateF: date[0] + ", " + date[1] + " " + date[2],
                            },

                            arriving = {
                                airportTimezone: "0",
                                airport: arriving_airport,
                                location: arriving_location,
                                terminal: (flight[i].airportResources && flight[i].airportResources.arrivalTerminal) || "N/A",
                                gate: (flight[i].airportResources && flight[i].airportResources.arrivalGate) || "N/A",
                                isDeparted: false
                            };

                        var is_on_time = this.onTime(flight[i], departureDate, arrivalDate);
                        if (is_on_time.length != 2) {
                            return Spice.failed('route');
                        }

                        var status = is_on_time[0];

                        results.push({
                            flight: flight[i],
                            airlineName: dictFlightStats[carrierCodes[carriersIndex].fsCode].name,
                            airlineCode: carrierCodes[carriersIndex].fsCode,
                            flightNumber: carrierCodes[carriersIndex].flightNumber,
                            departing: departing,
                            arriving: arriving,
                            departureDate: departureDate,
                            arrivalDate: arrivalDate,
                            scheduledDepartureDate: scheduledDepartureDate,
                            scheduledArrivalDate: scheduledArrivalDate,
                            status: status,
                            is_on_time: is_on_time[1],
                        });
                        break;
                    }
                }
            }

            if (results.length === 0) {
                return Spice.failed('route');
            }

            DDG.require('moment.js', function() {
                Spice.add({
                    data: results,
                    id: "route",
                    name: "Route",
                    meta: {
                        minItemsForModeSwitch: 3,
                        sourceName: 'FlightStats',
                        sourceUrl: "http://www.flightstats.com/go/FlightStatus/flightStatusByRoute.do?"
                            + "departure=" + this.sourceCity
                            + "&arrival=" + this.destinationCity,
                        itemType: 'flights'
                    },
                    normalize: function(item) {
                        var status_text,
                            arrival_datetime;

                        if (!item.is_on_time) {
                            status_text = 'Scheduled';
                            arrival_datetime = moment(item.scheduledArrivalDate);
                        } else {
                            if (moment(item.arrivalDate).isBefore(moment())) {
                                status_text = 'Arrived';
                                arrival_datetime = moment(item.arrivalDate);
                            } else {
                                status_text = 'Arrives';
                                arrival_datetime = moment(item.scheduledArrivalDate);
                            }
                        }
                        var scheduled_arrival = moment(item.scheduledArrivalDate),
                            scheduled_depart = moment(item.scheduledDepartureDate);

                        var same_date = (scheduled_arrival.date() === scheduled_depart.date());

                        return {
                            url: "http://www.flightstats.com/go/FlightStatus/flightStatusByFlight.do?"
                                + "airlineCode=" + item.airlineCode
                                + "&flightNumber=" + item.flightNumber
                                + "&departureDate="
                                + item.departureDate.getFullYear() + "-"
                                + (item.departureDate.getMonth() + 1) + "-"
                                + item.departureDate.getDate(),
                            datetime: arrival_datetime.fromNow(),
                            status_text: status_text,
                            scheduled_arrival: same_date ? scheduled_arrival.format('LT') : scheduled_arrival.format('LT (MMM DD)'),
                            scheduled_depart: same_date ? scheduled_depart.format('LT') : scheduled_depart.format('LT (MMM DD)'),
                            has_landed: (item.status == 'Landed')
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
                            content: Spice.flights_route.content
                        },
                        variants: {
                            tile: 'xwide'
                        }
                    },
                });
            });
        },

        // Check if the airplane is on-time or delayed.
        onTime: function onTime(flight, departureDate, arrivalDate, scheduledDeparture, scheduledArrival) {

            var deltaDepart = new Date(departureDate) - scheduledDeparture,
                deltaArrive = new Date(arrivalDate) - scheduledArrival;

            if (flight.status === "A" || flight.status === "S") {
                if (this.MILLIS_PER_MIN * 5 < deltaDepart && this.MILLIS_PER_MIN * 5 < deltaArrive) {
                    return ["Delayed", false];
                } else {
                    return ["On Time", true];
                }
            }
            return [this.STATUS[flight.status], true];
        }
    }

    //--- make the appropriate DDG spice functions globally available

    // this is the primary function for user flight queries by route
    ddg_spice_flights_route = ddg_spice_flights.route.bind(ddg_spice_flights);

    // this helper function queries individual source and destination airport pairs
    ddg_spice_flights_route_helper = ddg_spice_flights.route_helper.bind(ddg_spice_flights);

}(this))
