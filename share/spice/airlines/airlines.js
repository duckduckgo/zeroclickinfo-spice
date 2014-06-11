// Description:
// Shows the departure and arrival times of an airplane.
//
// Dependencies:
// Requires jQuery.
//
// Commands:
// american airlines 102 - will show details about the flight.
function ddg_spice_airlines(api_result) {
    "use strict";
    // Check if we have anything returned.
    if (!api_result || !api_result.flight) {
        return Spice.failed("airlines");
    }
    var MILLIS_PER_MIN = 6e4;
    var MILLIS_PER_HOUR = 60 * MILLIS_PER_MIN;
    var STATUS = {
        S: "Scheduled",
        A: "In the air",
        U: "Unknown status",
        R: "Redirected flight",
        L: "Landed",
        D: "Diverted",
        C: "Cancelled",
        NO: "Not Operational",
        DN: "Data Needed"
    };
    // Check if flight is an array or not.
    var flight = [];
    if (!$.isArray(api_result.flight)) {
        flight = [ api_result.flight ];
    } else {
        flight = api_result.flight;
    }
    // Parse string, and return the date (either arrival or departure date).
    var getDateFromString = function(date) {
        date = date.match(/([\d]{4})\-([\d]{2})\-([\d]{2})T([\d]{2}):([\d]{2}):([\d]{2})/);
        var now = new Date();
        var milliseconds = Date.UTC(date[1], date[2] - 1, date[3], date[4], date[5], date[6]) + now.getTimezoneOffset() * MILLIS_PER_MIN;
        return new Date(milliseconds);
    };
    // Compute the difference between now and the time of departure or arrival.
    var relativeTime = function(date, airportOffset) {
        // This is the time of departure or arrival (not sure why we're getting the difference).
        date = date.getTime() - date.getTimezoneOffset() * MILLIS_PER_MIN;
        // This is the current time at the airport (in milliseconds).
        var now = new Date().getTime() + airportOffset * MILLIS_PER_HOUR;
        return date - now;
    };
    // Convert the time from milliseconds to hours and minutes.
    var toTime = function(delta) {
        var time = "";
        var hours = Math.floor(Math.abs(delta / MILLIS_PER_HOUR));
        var minutes = Math.floor(Math.abs(delta % MILLIS_PER_HOUR / MILLIS_PER_MIN));
        if (hours > 0) {
            time += hours + " hrs ";
        }
        if (minutes > 0) {
            time += minutes + " mins ";
        }
        if (0 === delta) {
            return "now";
        } else {
            if (delta > 0) {
                return "in " + time;
            } else {
                return time + "ago";
            }
        }
    };
    // Check when the plane will depart (or if it has departed).
    Handlebars.registerHelper("airline_status", function(airportOffset, isDeparture) {
        var dateObject = arrivalDate;
        if (isDeparture) {
            dateObject = departureDate;
        }
        var delta = relativeTime(dateObject, airportOffset);
        if (isDeparture) {
            if (0 === delta) {
                return "Departing";
            } else {
                if (delta > 0) {
                    return "Departs";
                } else {
                    return "Departed";
                }
            }
        } else {
            if (0 === delta) {
                return "Arriving";
            } else {
                if (delta > 0) {
                    return "Arrives";
                } else {
                    return "Arrived";
                }
            }
        }
    }), // Compute for the relative time (e.g. 31 minutes ago).
    Handlebars.registerHelper("relative", function(airportOffset, isDeparture) {
        var dateObject = arrivalDate;
        if (isDeparture) {
            dateObject = departureDate;
        }
        var delta = relativeTime(dateObject, airportOffset);
        var time = toTime(delta);
        return time;
    }), Handlebars.registerHelper("airportName", function(name) {
        return name.replace(/airport|international/gi, "");
    }), // Add the date and time or departure or arrival.
    Handlebars.registerHelper("airline_time", function(isDeparture, arrivalDate, departureDate) {
        var dateObject = new Date(arrivalDate);
        if (isDeparture) {
            dateObject = new Date(departureDate);
        }
        var hours = dateObject.getHours();
        var minutes = dateObject.getMinutes();
        var date = dateObject.toDateString();
        date = date.substring(0, date.lastIndexOf(" "));
        // AM or PM?
        var suffix = hours >= 12 ? "PM" : "AM";
        // Convert to 12-hour time.
        if (hours > 12) {
            hours -= 12;
        } else {
            if (0 === hours) {
                hours = 12;
            }
        }
        // Add leading zeroes.
        return minutes = 10 > minutes ? "0" + minutes : minutes, hours + ":" + minutes + " " + suffix;
    });
    // Check if the airplane is on-time or delayed.
    var onTime = function(flight, departureDate, arrivalDate) {
        var scheduledDeparture = getDateFromString(flight.ScheduledGateDepartureDate);
        var scheduledArrival = getDateFromString(flight.ScheduledGateArrivalDate);
        var deltaDepart = new Date(departureDate) - scheduledDeparture;
        var deltaArrive = new Date(arrivalDate) - scheduledArrival;
        if ("A" === flight.StatusCode || "S" === flight.StatusCode) {
            if (deltaDepart > 5 * MILLIS_PER_MIN && deltaArrive > 5 * MILLIS_PER_MIN) {
                return [ "Delayed", !1 ];
            } else {
                return [ "On Time", !0 ];
            }
        }
        return [ STATUS[flight.StatusCode], !0 ];
    };
    Handlebars.registerHelper("status", function(flight, departureDate, arrivalDate) {
        var result = onTime(flight, departureDate, arrivalDate);
        var ok_class = result[1] ? "tile__ok" : "tile__not";
        return '<div class="' + ok_class + '">' + result[0] + "</div>";
    });
    // array of flights 
    var results = [];
    // package up the flights into the result array
    for (var i = 0; i < flight.length; i++) {
        var departureDate = getDateFromString(flight[i].ActualGateDepartureDate || flight[i].EstimatedGateDepartureDate || flight[i].DepartureDate).toString();
        var arrivalDate = getDateFromString(flight[i].ActualGateArrivalDate || flight[i].EstimatedGateArrivalDate || flight[i].ArrivalDate).toString();
        var scheduledDepartureDate = getDateFromString(flight[i].ScheduledGateDepartureDate).toString();
        var scheduledArrivalDate = getDateFromString(flight[i].ScheduledGateArrivalDate).toString();
        // Get the weekday and the day.
        var dateObject = new Date(departureDate);
        var date = dateObject.toDateString();
        date = date.split(" ");
        var departing = {
            airportTimezone: flight[i].DepartureAirportTimeZoneOffset,
            airport: flight[i].Origin,
            terminal: flight[i].DepartureTerminal || "<span class='na'>N/A</span>",
            gate: flight[i].DepartureGate || "<span class='na'>N/A</span>",
            isDeparted: !0,
            weekday: date[0].toUpperCase(),
            day: date[2]
        }, arriving = {
            airportTimezone: flight[i].ArrivalAirportTimeZoneOffset,
            airport: flight[i].Destination,
            terminal: flight[i].ArrivalTerminal || "<span class='na'>N/A</span>",
            gate: flight[i].ArrivalGate || "<span class='na'>N/A</span>",
            isDeparted: !1
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
    var source = "http://www.flightstats.com/go/FlightStatus/flightStatusByFlight.do?&airlineCode=" + flight[0].Airline.AirlineCode + "&flightNumber=" + flight[0].FlightNumber;
    // Sort the items based on the departureDate.
    results.sort(function(a, b) {
        if (a = +new Date(a.departureDate), b = +new Date(b.departureDate), b > a) {
            return -1;
        } else {
            if (a > b) {
                return 1;
            }
        }
        return 0;
    }), Spice.add({
        data: results,
        sourceUrl: source,
        sourceName: "FlightStats",
        id: "airlines",
        name: "Flights",
        view: "Tiles",
        meta: {
            minItemsForModeSwitch: 3,
            sourceName: "FlightStatus",
            sourceUrl: source,
            itemType: "Flight Status for " + DDG.capitalizeWords(flight[0].Airline.Name) + " " + flight[0].FlightNumber
        },
        normalize: function(item) {
            return {
                url: "http://www.flightstats.com/go/FlightStatus/flightStatusByFlight.do?&airlineCode=" + item.flight.Airline.AirlineCode + "&flightNumber=" + item.flight.FlightNumber
            };
        },
        template_group: "base",
        templates: {
            detail: !1,
            options: {
                content: Spice.airlines.content,
                variant: "xwide"
            }
        }
    });
}