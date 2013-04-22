var ddg_spice_airlines = function(api_result) {
    "use strict";

    // Check if we have anything returned.
    if(!api_result || !api_result.flight) {
        return;
    }

    var MILLIS_PER_MIN = 60000;
    var MILLIS_PER_HOUR = MILLIS_PER_MIN * 60;
    var STATUS = {
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

    var flight = api_result.flight;
    if($.isArray(flight)) {
        flight = flight[0];
    }

    // Parse string, and return the date (either arrival or departure date).
    var getDateFromString = function(date) {
        date = date.match(/([\d]{4})\-([\d]{2})\-([\d]{2})T([\d]{2}):([\d]{2}):([\d]{2})/);
        var now = new Date();
        var milliseconds = Date.UTC(date[1], date[2] - 1, date[3], date[4], date[5], date[6]) +
                                (now.getTimezoneOffset() * MILLIS_PER_MIN);
        return new Date(milliseconds);
    };

    // Compute the difference between now and the time of departure or arrival.
    var relativeTime = function(date, airportOffset) {
        // This is the time of departure or arrival (not sure why we're getting the difference).
        date = date.getTime() - (date.getTimezoneOffset() * MILLIS_PER_MIN);

        // This is the current time at the airport (in milliseconds).
        var now = new Date().getTime() + (airportOffset * MILLIS_PER_HOUR);

        return date - now;
    };

    // Convert the time from milliseconds to hours and minutes.
    var toTime = function(delta) {
        var time = "";
        var hours = Math.floor(Math.abs(delta / MILLIS_PER_HOUR));
        var minutes = Math.floor(Math.abs((delta % MILLIS_PER_HOUR) / MILLIS_PER_MIN));

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
            return time + " ago";
        }
    };

    // Check when the plane will depart (or if it has departed).
    Handlebars.registerHelper("status", function(actualDate, estimatedDate, publishedDate, airportOffset, isDeparture) {
        var dateString = actualDate || estimatedDate || publishedDate;
        var dateObject = getDateFromString(dateString);

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
    Handlebars.registerHelper("relative", function(actualDate, estimatedDate, publishedDate, airportOffset) {
        var dateString = actualDate || estimatedDate || publishedDate;
        var dateObject = getDateFromString(dateString);

        var delta = relativeTime(dateObject, airportOffset);
        var time = toTime(delta);

        return time;
    });

    Handlebars.registerHelper("airportName", function(name) {
        return name.replace(/airport|international/ig, "");
    });

    Handlebars.registerHelper("checkGate", function(gate) {
        return gate || "—";
    });

    Handlebars.registerHelper("checkTerminal", function(terminal) {
        return terminal || "—";
    });

    // Add the date and time or departure or arrival.
    Handlebars.registerHelper("time", function(actualDate, estimatedDate, publishedDate) {
        var dateString = actualDate || estimatedDate || publishedDate;
        var dateObject = getDateFromString(dateString);

        var hours = dateObject.getHours();
        var minutes = dateObject.getMinutes();

        var date = dateObject.toDateString();
        date = date.substring(0, date.lastIndexOf(" "));

        // AM or PM?
        var suffix = "a.m.";
        if(hours >= 12) {
            suffix = "p.m.";
        }

        // Convert to 12-hour clock.
        if(hours > 12) {
            hours -= 12;
        } else if(hours === 0) {
            hours = 12;
        }

        // Add leading zeroes.
        minutes = minutes < 10 ? "0" + minutes : minutes;

        return date + ", " + hours + ":" + minutes + " " + suffix;
    });

    // Check if the airplane is on-time or delayed.
    var onTime = function() {
        var departureDate = getDateFromString(flight.ActualGateDepartureDate || flight.EstimatedGateDepartureDate || flight.DepartureDate);
        var scheduledDeparture = getDateFromString(flight.ScheduledGateDepartureDate);

        var arrivalDate = getDateFromString(flight.ActualRunwayArrivalDate || flight.EstimatedGateArrivalDate || flight.ArrivalDate);
        var scheduledArrival = getDateFromString(flight.ScheduledGateArrivalDate);

        var deltaDepart = departureDate - scheduledDeparture;
        var deltaArrive = arrivalDate - scheduledArrival;
        if(flight.StatusCode === "A" || flight.StatusCode === "S") {
            if(MILLIS_PER_MIN * 5 < deltaDepart && MILLIS_PER_MIN * 5 < deltaArrive) {
                return "Delayed";
            } else {
                return "On-time";
            }
        }
        return STATUS[flight.StatusCode];
    };

    // Make the header.
    var statusHeader = function() {
        return onTime() + ": Flight Status for " +
                    flight.Airline.Name + " " + flight.FlightNumber;
    };

    // This is the URL for the "More at ..." link.
    var flightURL = function() {
        return "http://www.flightstats.com/go/FlightStatus/flightStatusByFlight.do?&airlineCode=" +
                    flight.Airline.AirlineCode + "&flightNumber=" + flight.FlightNumber;
    };

    // Display the plug-in.
    Spice.render({
        data             : flight,
        header1          : statusHeader(),
        source_url       : flightURL(),
        source_name      : "FlightStats",
        template_normal  : "airlines",
        force_big_header : true
    });
};