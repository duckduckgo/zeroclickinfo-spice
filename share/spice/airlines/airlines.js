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

    env.ddg_spice_airlines = function(api_result) {
        "use strict";

        // Check if we have anything returned.
        if (!api_result || !api_result.flight) {
            return Spice.failed('airlines');
        }
 
        // Check if flight is an array or not.
        var flight = [];
        if (!($.isArray(api_result.flight))) {
            flight = [api_result.flight];
        } else {
            flight = api_result.flight;
        }

        // array of flights 
        var results = [];

        // package up the flights into the result array
        for (var i = 0; i < flight.length; i++) {
            var departureDate = DDG.getDateFromString(flight[i].ActualGateDepartureDate ||
                flight[i].EstimatedGateDepartureDate ||
                flight[i].DepartureDate).toString();
            var arrivalDate = DDG.getDateFromString(flight[i].ActualGateArrivalDate ||
                flight[i].EstimatedGateArrivalDate ||
                flight[i].ArrivalDate).toString();

            var scheduledDepartureDate = DDG.getDateFromString(flight[i].ScheduledGateDepartureDate).toString();
            var scheduledArrivalDate = DDG.getDateFromString(flight[i].ScheduledGateArrivalDate).toString();


            // Get the weekday and the day.
            var dateObject = new Date(departureDate);

            var date = dateObject.toDateString();
            date = date.split(" ");

            var departing = {
                airportTimezone: flight[i].DepartureAirportTimeZoneOffset,
                airport: flight[i].Origin,
                terminal: flight[i].DepartureTerminal || "<span class='na'>N/A</span>",
                gate: flight[i].DepartureGate || "<span class='na'>N/A</span>",
                isDeparted: true,
                weekday: date[0].toUpperCase(),
                day: date[2]
            },
                arriving = {
                    airportTimezone: flight[i].ArrivalAirportTimeZoneOffset,
                    airport: flight[i].Destination,
                    terminal: flight[i].ArrivalTerminal || "<span class='na'>N/A</span>",
                    gate: flight[i].ArrivalGate || "<span class='na'>N/A</span>",
                    isDeparted: false
                };

            results.push({
                flight: flight[i],
                departing: departing,
                arriving: arriving,
                departureDate: departureDate,
                arrivalDate: arrivalDate,
                scheduledDepartureDate: scheduledDepartureDate,
                scheduledArrivalDate: scheduledArrivalDate
            });
        }

        // Display.
        var source = "http://www.flightstats.com/go/FlightStatus/flightStatusByFlight.do?&airlineCode=" +
            flight[0].Airline.AirlineCode +
            "&flightNumber=" +
            flight[0].FlightNumber;

        Spice.add({
            data: results,
            id: "airlines",
            name: "Flights",
            meta: {
                minItemsForModeSwitch: 3,
                sourceName: 'FlightStatus',
                sourceUrl: source,
                itemType: "Flights"
            },
            normalize: function(item) {
                return {
                    url: "http://www.flightstats.com/go/FlightStatus/flightStatusByFlight.do?&airlineCode=" +
                        item.flight.Airline.AirlineCode +
                        "&flightNumber=" +
                        item.flight.FlightNumber
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
                    content: Spice.airlines.content,
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

    // Compute for the relative time (e.g. 31 minutes ago).
    Handlebars.registerHelper("relative", function(airportOffset, isDeparture) {
        var dateObject = arrivalDate;
        if(isDeparture) {
            dateObject = departureDate;
        }

        var delta = relativeTime(dateObject, airportOffset),
            time = toTime(delta);

        return time;
    });

    Handlebars.registerHelper("airportName", function(name) {
        return name.replace(/airport|international/ig, "");
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

        return hours + ":" + minutes + " " + suffix;
    });

    // Check if the airplane is on-time or delayed.
    function onTime(flight, departureDate, arrivalDate) {
        var scheduledDeparture = DDG.getDateFromString(flight.ScheduledGateDepartureDate),
            scheduledArrival = DDG.getDateFromString(flight.ScheduledGateArrivalDate),
            deltaDepart = new Date(departureDate) - scheduledDeparture,
            deltaArrive = new Date(arrivalDate) - scheduledArrival;

        if (flight.StatusCode === "A" || flight.StatusCode === "S") {
            if (MILLIS_PER_MIN * 5 < deltaDepart && MILLIS_PER_MIN * 5 < deltaArrive) {
                return ["Delayed", false];
            } else {
                return ["On Time", true];
            }
        }
        return [STATUS[flight.StatusCode], true];
    };

    Handlebars.registerHelper("status", function(flight, departureDate, arrivalDate) {
        var result = onTime(flight, departureDate, arrivalDate),
            ok_class = result[1] ? "tile__ok" : "tile__not";
        return '<div class="' + ok_class + '">' + result[0] + '</div>';
    });
}(this))
