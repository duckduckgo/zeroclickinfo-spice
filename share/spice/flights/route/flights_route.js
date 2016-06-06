(function(env) {

    "use strict";

    var path = "/js/spice/flights",
        id = 'route',

        // store the user's airline and city search information
        queriedAirlines = null,
        sourceCity = null,
        destinationCity = null,

        // min number of minutes to be considered as 'delay'
        MIN_DELAY_MINUTES= 5,
        
        // define some static variables for callback and helpers
        MILLIS_PER_MIN = 60000,
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


    // this function parses the initial query and sends out additional queries
    // as necessary for cities with multiple airports
    env.ddg_spice_flights_route = function(api_result){
        // prevent jQuery from appending "_={timestamp}" in our url when we use $.getScript
        $.ajaxSetup({ cache: true });

        // Get the original query to continue polling for other potential airports
        // and for filtering results by airline
        var script = $('[src*="/js/spice/flights/route/"]')[0],
            source = $(script).attr("src"),
            match  = source.match(/\/js\/spice\/flights\/route\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)\/(.*)/),
            queriedSrcAirports = match[2].split('%2C'),
            queriedDstAirports = match[3].split('%2C');

        queriedAirlines = match[1].split('%2C');
        sourceCity = match[10].replace('%2B', "+");
        destinationCity = match[11].replace('%2B', "+");

        // create all remaining source/destination pairs that have not yet been polled for
        for (var srcCounter = 0; srcCounter < queriedSrcAirports.length; srcCounter++) {

            for (var dstCounter = 0; dstCounter < queriedDstAirports.length; dstCounter++) {

                // skip the first pair because the initial spice-to already
                // obtained this result
                if (srcCounter === 0 && dstCounter === 0)
                    continue;

                $.getJSON(path +
                    "/route_helper/" +
                    queriedSrcAirports[srcCounter] + "/" +
                    queriedDstAirports[dstCounter] + "/arr/" +
                    match[6] + "/" + match[7] + "/" + match[8] +
                    "/" + match[9], display);
            }
        }

        display(api_result);
    };


    // this function displays flight results
    function display (api_result) {

        // Check if we have anything returned.
        if (!api_result || !api_result.flightStatuses || !api_result.appendix.airlines) {
            return Spice.failed('route');
        }

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
            var first_active_index = -1;

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

                    if (queriedAirlines.indexOf(dictFlightStats[carrierCodes[carriersIndex].fsCode].icao) !== -1) {

                        var current = flight[i],
                            opTime = current.operationalTimes;

                        var departureDate =
                            DDG.getProperty(opTime, "actualGateDeparture.dateUtc") ||
                            DDG.getProperty(opTime, "estimatedGateDeparture.dateUtc") ||
                            DDG.getProperty(opTime, "scheduledGateDeparture.dateUtc") ||
                            DDG.getProperty(opTime, "flightPlanPlannedDeparture.dateUtc");

                        console.log(moment(departureDate));

                        var arrivalDate =
                            DDG.getProperty(opTime, 'actualGateArrival.dateUtc') ||
                            DDG.getProperty(opTime, 'estimatedGateArrival.dateUtc') ||
                            DDG.getProperty(opTime, 'scheduledGateArrival.dateUtc') ||
                            DDG.getProperty(opTime, 'flightPlanPlannedArrival.dateUtc');

                        var scheduledDepartureDate =
                            DDG.getProperty(opTime, 'scheduledGateDeparture.dateUtc') ||
                            DDG.getProperty(opTime, 'flightPlanPlannedDeparture.dateUtc');

                        var scheduledArrivalDate =
                            DDG.getProperty(opTime, 'scheduledGateArrival.dateUtc') ||
                            DDG.getProperty(opTime, 'flightPlanPlannedArrival.dateUtc');

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

                        var status = getStatus(current);

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

                        break;
                    }
                }
            }

            if (results.length === 0) {
                return Spice.failed('route');
            }

            Spice.add({
                data: results,
                id: "route",
                name: "Route",
                meta: {
                    minItemsForModeSwitch: 3,
                    sourceName: 'FlightStats',
                    sourceUrl: "http://www.flightstats.com/go/FlightStatus/flightStatusByRoute.do?" +
                        "departure=" + sourceCity +
                        "&arrival=" + destinationCity,
                    itemType: 'flights',
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

                    var year = moment(item.departureDate).year(),
                        month = moment(item.departureDate).month() + 1,
                        day = moment(item.departureDate).date();
                    
                    return {
                        datetime: display_datetime ? display_datetime.fromNow() : "",
                        delay_time: delay_time ? moment.duration(delay_time, "minutes").humanize() : delay_time,
                        progress_percent: progress_percent,
                        scheduled_progress_percent: scheduled_progress_percent,
                        status_text: status_text,
                        scheduled_arrival: same_date ? scheduled_arrival.format('LT') : scheduled_arrival.format('LT (MMM DD)'),
                        scheduled_depart: same_date ? scheduled_depart.format('LT') : scheduled_depart.format('LT (MMM DD)'),
                        has_landed: item.status === 'Landed',
                        is_cancelled: item.status === 'Cancelled',
                        has_arrived: status_text === 'Arrived' || status_text === 'Cancelled',
                        url: "http://www.flightstats.com/go/FlightStatus/flightStatusByFlight.do?" +
                            "airlineCode=" + item.airlineCode +
                            "&flightNumber=" + item.flightNumber +
                            "&departureDate=" + year + "-" + month + "-" + day
                    };
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
                        content: Spice.flights_route.content
                    },
                    variants: {
                        tile: 'xwide'
                    },
                    elClass: {
                        tile: 'whole--screen-s'
                    }
                },
                onShow: function(item) {
                    // Give landed flights a grey background
                    $('.tile__landed, .tile__cancelled').parents('.tile__body').addClass('bg-clr--silver-light');                    
                }
            });
        });
    }
    

    // Check if the airplane is on-time or delayed.
    function getStatus(flight) {
        
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

            // Flight scheduled
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
        return onTime ? 'clr--green' : 'clr--red';
    }

    function not_empty (value) {
        return value !== undefined && value !== '';
    }
}(this));
