(function (env) {
    "use strict";
    env.ddg_spice_tor_relay = function(api_response) {

        if (!api_response || !api_response.relays.length) {
            return Spice.failed('tor_relay');
        }

        var query = DDG.get_query()
                    .replace(/\s*tor relay\s*/, "")
                    .replace(/\s*onion relay\s*/, "");

        if (api_response.relays.length > 1) {
            var sourceUrl = 'https://globe.torproject.org/#/search/query=' + encodeURIComponent(query),
                data = {
                    record_data: {
                        'Too many results' : 'Visit the link below to see them all.'
                    }
                };
        }
        else {
            var sourceUrl = 'https://globe.torproject.org/#/relay/' + encodeURIComponent(api_response.relays[0].fingerprint),
                data = {
                    record_data : {}
                };

            // Parse the api_response.relays[0] structure to fit on the 'record' template
            for (var prop in api_response.relays[0]) {
                if (prop === "last_seen") {
                    data.record_data[prop.replace("_", " ")] = toTime(api_response.relays[0][prop]);
                } else if (prop === "advertised_bandwidth") {
                    data.record_data[prop.replace("_", " ")] = bandwidth(api_response.relays[0][prop]);
                } else if (typeof(api_response.relays[0][prop]) === 'object') {
                    data.record_data[prop.replace("_", " ")] = api_response.relays[0][prop].join(', ');
                } else if (typeof(api_response.relays[0][prop]) !== 'string') {
                    data.record_data[prop.replace("_", " ")] = api_response.relays[0][prop].toString();
                } else {
                    data.record_data[prop.replace("_", " ")] = api_response.relays[0][prop];
                }
            }
        }

        Spice.add({
            id : 'tor_relay',
            name : 'Tor Relay Status',
            data : data,
            meta : {
                sourceUrl : sourceUrl,
                sourceName : 'Globe'
            },
            templates: {
                group : 'base',
                options : {
                    content : 'record',
                    rowHighlight : false,
                    moreAt : true
                }
            },
        });
    };

    // Convert the relative time between dateStr and now to hours and minutes
    function toTime(dateStr) {
        dateStr = dateStr.replace(" ", "T");
        var MILLIS_PER_MIN = 60000,
            MILLIS_PER_HOUR = MILLIS_PER_MIN * 60,
            time = "",
            delta = new Date().getTime() - DDG.getDateFromString(dateStr).getTime(),
            hours = Math.floor(Math.abs(delta / MILLIS_PER_HOUR)),
            minutes = Math.floor(Math.abs((delta % MILLIS_PER_HOUR) / MILLIS_PER_MIN));

        if (0 < hours) {
            time += hours + " hrs ";
        }
        if (0 < minutes) {
            time += minutes + " mins ";
        }

        return ((delta === 0) ? "now" : time + "ago");
    };

    // Convert bandwith to formatted bandwidth
    function bandwidth(value) {
        var formatted = 'n/a';

        value = parseInt(value, 10);
        if(value !== -1 && !isNaN(value)){
            var bandwidthKB = value / 1000;
            var bandwidthMB = bandwidthKB / 1000;

            if (bandwidthMB >= 1) {
                formatted = Math.round(bandwidthMB * 100) / 100 + ' MB/s';
            } else {
                if (bandwidthKB >= 1) {
                    formatted = Math.round(bandwidthKB * 100) / 100 + ' kB/s';
                } else {
                    formatted = value + ' B/s';
                }   
            }   
        }   

        return formatted;
    };


}(this));

