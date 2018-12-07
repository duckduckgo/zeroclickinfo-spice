(function(env) {
    
    "use strict";
    
    // define some static variables for callback and helpers
    var MILLIS_PER_MIN = 60000,
        MILLIS_PER_HOUR = MILLIS_PER_MIN * 60,
        
        // min number of minutes to be considered as 'delay'
        MIN_DELAY_MINUTES= 5,
        
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
    
    // store the user's airline
    var queryCarrier = null;
    
    env.ddg_spice_airlines = function(api_result) {
        // prevent AJAX from appending a timestamp to the URL
        $.ajaxSetup({ cache: true });

        // Check if FlightStats returned anything
        if (!api_result || !api_result.flightStatuses || !api_result.appendix || !api_result.appendix.airlines || !api_result.appendix.airports) {
            return Spice.failed('airlines');
        }

        // extract parameters from the Flightstats request
        var script = $('[src*="/js/spice/airlines/"]')[0],
            source = $(script).attr("src"),
            callParameters = decodeURIComponent(source).split('/');        
          
        queryCarrier = decodeURIComponent(source.match(/airlines\/([^\/]+)/)[1]).toLowerCase();
        
        // determine the original date that we made an upstream request
        var originalRequestDayOfMonth = callParameters[8];
        var originalRequestHour = callParameters[9];        
        
        DDG.require('moment.js', function() {
            // setup Moment.js
            moment.locale('en', {
                relativeTime : {
                    future: "in %s",
                    past:   "%s ago",
                    s:  "s",
                    m:  "1m",
                    mm: "%dm",
                    h:  "1h",
                    hh: "%dh",
                    d:  "1d",
                    dd: "%dd",
                    M:  "1mo",
                    MM: "%dmo",
                    y:  "1y",
                    yy: "%dy"
                }
            });
            
            // Fine-grained relative thresholds for humanize times
            moment.relativeTimeThreshold('m', 59);
            moment.relativeTimeThreshold('h', 23);

            // for every API request, we make an additional request to 
            // grab results for late-night arrivals from the night before and 
            // red eyes for the next day (relative to UTC)
            //
            // more broadly, this allows us to grab a larger window of flights                    
            var apiResponseDate = moment(api_result.request.date.year + "-" +
                                        api_result.request.date.month + "-" + 
                                        api_result.request.date.day + " " +
                                        originalRequestHour, "YYYY-MM-DD HH:00Z");

            // if this response is for the original same-day request...
            if (originalRequestDayOfMonth == apiResponseDate.date()) {
                
                //  and the current hour is before 3AM, get the previous day's flights as well
                //  (so we can show arrivals for late-night flights)
                // otherwise, get the next day's flights so that we have at least
                // 24 hours worth of flights even as the current day approaches an end
                var apiRequestDate = originalRequestHour < 3 ? apiResponseDate.subtract(1, "day") : apiResponseDate.add(1, "day");         

                // make an additional upstream call 
                $.getScript("/js/spice/airlines/"
                        + callParameters[4] + "/"
                        + callParameters[5] + "/"
                        + apiRequestDate.year() + "/"
                        + (apiRequestDate.month() + 1)+ "/"
                        + apiRequestDate.date() + "/"
                        + originalRequestHour);
            }

            display(api_result);
        });
    };

    function display (api_result) {
        
        // Create dictionaries to convert FlightStat codes to ICAO codes/airline names
        var dictFlightStats = [];
        $.each(api_result.appendix.airlines, function(index, value) {
                dictFlightStats[value.fs] = {
                    "icao": value.icao,
                    "name": value.name
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
        var first_active_index = -1;
        
        // package up the flights into the result array
        for (var i = 0; i < flight.length; i++) {
            
            var current = flight[i],
                opTime = current.operationalTimes;

            // if this flight arrived more than 3 hours ago, do not add it
            if (DDG.getProperty(opTime, "actualGateArrival.dateUtc")) {
                var arrivalDateLimit = moment(DDG.getProperty(opTime, "actualGateArrival.dateUtc")).add(3, "hours");
                if (moment.utc().isAfter(arrivalDateLimit)) {
                    continue;
                }
            }

            // if this flight is departing more than 24 hours into the future, do not add it           
            if (DDG.getProperty(opTime, "scheduledGateDeparture.dateUtc")) {
                var departureTimeLimit = moment(DDG.getProperty(opTime, "scheduledGateDeparture.dateUtc")).subtract(1, "day");
                if (moment.utc().isBefore(departureTimeLimit)) {
                    continue;
                }  
            }                          

            var airlineName = dictFlightStats[current.carrierFsCode].name;
            var airlineCode = current.carrierFsCode;
            var flightNumber = current.flightNumber;

            // If this is a code-shared flight, we may not have the right
            // airline name/code information...try to find a better match
            if (airlineCode !== queryCarrier && current.codeshares) {

                for (var j = 0; j < current.codeshares.length; j++) {

                    if (current.codeshares[j].fsCode.toLowerCase() === queryCarrier) {
                        airlineCode = current.codeshares[j].fsCode;
                        airlineName = dictFlightStats[airlineCode].name;
                        flightNumber = current.codeshares[j].flightNumber;

                        // we can break immediately if we find the matching code-share flight
                        break;
                    }
                }
            }

            var departureDate =
                DDG.getProperty(opTime, "actualGateDeparture.dateUtc") ||
                DDG.getProperty(opTime, "estimatedGateDeparture.dateUtc") ||
                DDG.getProperty(opTime, "scheduledGateDeparture.dateUtc") ||
                DDG.getProperty(opTime, "flightPlanPlannedDeparture.dateUtc");      

            var arrivalDate =
                DDG.getProperty(opTime, "actualGateArrival.dateUtc") ||
                DDG.getProperty(opTime, "estimatedGateArrival.dateUtc") ||
                DDG.getProperty(opTime, "scheduledGateArrival.dateUtc") ||
                DDG.getProperty(opTime, "flightPlanPlannedArrival.dateUtc");

            var scheduledDepartureDate = 
                DDG.getProperty(opTime, "scheduledGateDeparture.dateUtc") ||
                DDG.getProperty(opTime, "flightPlanPlannedDeparture.dateUtc");

            var scheduledArrivalDate =
                DDG.getProperty(opTime, "scheduledGateArrival.dateUtc") ||
                DDG.getProperty(opTime, "flightPlanPlannedArrival.dateUtc");
            
            var scheduledDepartureDateLocal =
                DDG.getProperty(opTime, 'scheduledGateDeparture.dateLocal') ||
                DDG.getProperty(opTime, 'flightPlanPlannedDeparture.dateLocal');

            var scheduledArrivalDateLocal =
                DDG.getProperty(opTime, 'scheduledGateArrival.dateLocal') ||
                DDG.getProperty(opTime, 'flightPlanPlannedArrival.dateLocal');     

            var departing_airport = dictAirportStats[current.departureAirportFsCode];
            var departing_location = [
                departing_airport.city,
                departing_airport.stateCode,
                departing_airport.countryCode
            ].filter(not_empty).join(', ');

            var arriving_airport = dictAirportStats[current.arrivalAirportFsCode];
            var arriving_location = [
                arriving_airport.city,
                arriving_airport.stateCode,
                arriving_airport.countryCode
            ].filter(not_empty).join(', ');

            
            var departing = {
                    airportTimezone: "0",
                    airport: departing_airport,
                    location: departing_location,
                    terminal: (current.airportResources && current.airportResources.departureTerminal) || "N/A",
                    gate: (current.airportResources && current.airportResources.departureGate) || "N/A",
                    isDeparted: true,
                    departureDateF: moment(departureDate).format("ddd MMM, D"),
                },

                arriving = {
                    airportTimezone: "0",
                    airport: arriving_airport,
                    location: arriving_location,
                    terminal: (current.airportResources && current.airportResources.arrivalTerminal) || "N/A",
                    gate: (current.airportResources && current.airportResources.arrivalGate) || "N/A",
                    isDeparted: false
                };
            
            var status = getStatus(current, moment(departureDate).diff(scheduledDepartureDate), moment(arrivalDate).diff(scheduledArrivalDate));                
            
            results.push({
                flight: current,
                airlineName: airlineName,
                airlineCode: airlineCode,
                flightNumber: flightNumber,
                departing: departing,
                arriving: arriving,
                departureDate: departureDate,
                arrivalDate: arrivalDate,
                scheduledDepartureDate: scheduledDepartureDate,
                scheduledArrivalDate: scheduledArrivalDate,
                scheduledDepartureDateLocal: scheduledDepartureDateLocal,
                scheduledArrivalDateLocal: scheduledArrivalDateLocal,
                status: status[0],
                is_on_time: status[1],
                statusColor: getStatusColor(status[1]),
                delayTime: status[2]
            });
            
            if (first_active_index == -1 && !(status[0] === 'Landed' || status[0] === 'Cancelled')) {
                first_active_index = results.length - 1;
            }
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
                itemType: results.length === 1 ? "Flight Information" : "Flights by Departure Time" ,
                disableMobileGrid: true,
                selectedItem: first_active_index == -1 ? 0 : first_active_index,
                scrollToSelectedItem: true
            },
            normalize: function(item) {
                var status_text,
                    display_datetime,
                    delay_time = item.delayTime;
                   
                if (item.status === 'Cancelled'){
                    status_text = 'Cancelled';                       
                } else if (moment(item.arrivalDate).isBefore(moment().utc())) {
                    status_text = 'Arrived';
                    display_datetime = moment(item.arrivalDate);
                } else {
                    if (moment(item.departureDate).isAfter(moment().utc())) {
                        status_text = 'Departs';
                        display_datetime = moment(item.departureDate);
                    } else {
                        status_text = 'Arrives';
                        display_datetime = moment(item.arrivalDate);                           
                    }
                }
                
                var scheduled_arrival = moment(item.scheduledArrivalDateLocal),
                    scheduled_depart = moment(item.scheduledDepartureDateLocal),
                    same_date = scheduled_arrival.isSame(scheduled_depart, "day");
                
                var progress_max = 98,
                    progress_percent = 100,
                    scheduled_progress_percent = 100,
                    time_total = moment(item.scheduledArrivalDate).diff(item.scheduledDepartureDate),
                    time_remaining = moment(item.scheduledArrivalDate).diff(moment().utc());           
                
                                   
                if (status_text !== 'Arrived' && status_text !== 'Cancelled') {
                    scheduled_progress_percent = progress_max * (time_total - time_remaining) / time_total;                    
                    if (delay_time) progress_percent = progress_max * (time_total - time_remaining - (delay_time * MILLIS_PER_MIN)) / time_total;
                    if (scheduled_progress_percent < 0) scheduled_progress_percent = 0;
                    if (scheduled_progress_percent > progress_max) scheduled_progress_percent = progress_max;
                    if (progress_percent < 0) progress_percent = 0;
                    if (progress_percent > scheduled_progress_percent) progress_percent = scheduled_progress_percent;
                }
                
                return {
                    datetime: display_datetime ? display_datetime.fromNow() : "",
                    delay_time: delay_time ? moment.duration(delay_time, "minutes").humanize() : delay_time,
                    progress_percent: progress_percent,
                    scheduled_progress_percent : scheduled_progress_percent,
                    status_text: status_text,
                    scheduled_arrival: same_date ? scheduled_arrival.format('LT') : scheduled_arrival.format('LT (MMM DD)'),
                    scheduled_depart: same_date ? scheduled_depart.format('LT') : scheduled_depart.format('LT (MMM DD)'),
                    has_landed: item.status === 'Landed',
                    is_cancelled: item.status === 'Cancelled',
                    has_arrived: status_text === 'Arrived' || status_text === 'Cancelled',
                    url: "http://www.flightstats.com/go/FlightStatus/flightStatusByFlight.do?"
                        + "airlineCode=" + item.airlineCode 
                        + "&flightNumber=" + item.flightNumber
                }
            },
            sort_fields: {
                departureDate: function(a, b) {
                    a = moment(a.departureDate);
                    b = moment(b.departureDate);
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
                },
                elClass: {
                    tile: 'whole--screen-s'
                }
            },
            onItemShown: function(item) {
                // Give landed flights a grey background
                $('.tile__landed, .tile__cancelled').parents('.tile__body').addClass('bg-clr--silver-light');                    
            },
            allowMultipleCalls: true
        });
    }
    
    // Check if the airplane is on-time or delayed.    
    function getStatus(flight, deltaDepart, deltaArrive) {
        
        function formatDelayTime(delayTime){                      
            return (!delayTime || (delayTime < MIN_DELAY_MINUTES))? false : delayTime;
        }
        
        var status,
            delayTime = false;
        
        switch (flight.status) {
            // Flight cancelled
            case "C":
                status = ["Cancelled", false, delayTime];
                break;

            // Flight in-progress
            case "A":
                delayTime = formatDelayTime(DDG.getProperty(flight.delays, "arrivalGateDelayMinutes")   || 
                                            DDG.getProperty(flight.delays, "departureGateDelayMinutes") ||
                                            DDG.getProperty(flight.delays, "arrivalRunwayDelayMinutes"));
                if (delayTime) {                                        
                    status = ["Delayed", false, delayTime];
                } else {
                    status = ["On Time", true, delayTime];
                }
                break;
                
            case "S":
                delayTime = formatDelayTime(DDG.getProperty(flight.delays, "departureGateDelayMinutes"));
                if (delayTime) {                    
                    status = ["Delayed", false, delayTime];
                } else {
                    status = ["On Time", true, delayTime];
                }
                break;
                
            // Flight delayed, re-routed, status unknown, etc
            default:
                status = [STATUS[flight.status], true, delayTime];
                break;
        } 
        
        return status;
    }     
    
    function getStatusColor (onTime) {
        return onTime ? "clr--green" : "clr--red";
    }
    
    function not_empty (value) {
        return value !== undefined && value !== '';
    }
    
}(this))
