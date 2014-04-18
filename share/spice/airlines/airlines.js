// Description:
// Shows the departure and arrival times of an airplane.
//
// Dependencies:
// Requires jQuery.
//
// Commands:
// american airlines 102 - will show details about the flight.
function ddg_spice_airlines (api_result) {
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

    // Check if flight is an array or not.
    var flight = [];
    if(!($.isArray(api_result.flight))){
        flight = [api_result.flight];
    } else {
        flight = api_result.flight;
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

        var delta = relativeTime(dateObject, airportOffset);
        var time = toTime(delta);

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

        var hours = dateObject.getHours();
        var minutes = dateObject.getMinutes();

        var date = dateObject.toDateString();
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
    var onTime = function(flight, departureDate, arrivalDate) {
        var scheduledDeparture = getDateFromString(flight.ScheduledGateDepartureDate);
        var scheduledArrival = getDateFromString(flight.ScheduledGateArrivalDate);

        var deltaDepart = new Date(departureDate) - scheduledDeparture;
        var deltaArrive = new Date(arrivalDate) - scheduledArrival;
        if(flight.StatusCode === "A" || flight.StatusCode === "S") {
            if(MILLIS_PER_MIN * 5 < deltaDepart && MILLIS_PER_MIN * 5 < deltaArrive) {
                return ["Delayed", false];
            } else {
                return ["On Time", true];
            }
        }
        return [STATUS[flight.StatusCode], true];
    };

    Handlebars.registerHelper("status", function(flight, departureDate, arrivalDate) {
	var result = onTime(flight, departureDate, arrivalDate);
	var ok_class = result[1] ? "tile__ok" : "tile__not";
	return '<div class="' + ok_class + '">' + result[0] + '</div>'; 
    });

    // array of flights 
    var results = [];

    // package up the flights into the result array
    for(var i = 0; i < flight.length; i++) {
        var departureDate = getDateFromString(flight[i].ActualGateDepartureDate || 
					      flight[i].EstimatedGateDepartureDate || 
					      flight[i].DepartureDate).toString();
        var arrivalDate = getDateFromString(flight[i].ActualGateArrivalDate || 
					    flight[i].EstimatedGateArrivalDate || 
					    flight[i].ArrivalDate).toString();

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
	
        results.push({flight: flight[i], departing: departing, arriving: arriving, departureDate: departureDate, arrivalDate: arrivalDate});
    }

    // Display.
    var source = "http://www.flightstats.com/go/FlightStatus/flightStatusByFlight.do?&airlineCode=" +
	flight[0].Airline.AirlineCode +
	"&flightNumber=" +
	flight[0].FlightNumber;

    results.reverse();

    Spice.add({
        data: results,
        sourceUrl: source,
        sourceName: "FlightStats",
        id: "airlines",
        name: "Flights",
        view: "Tiles",
        meta: {
            sourceName: 'FlightStatus',
            sourceUrl: source,
            itemType: "Flight Status for " + flight[0].Airline.Name + " " + flight[0].FlightNumber
        },
        templates : {
            item: Spice.airlines.airlines
        }, 
    });
};
