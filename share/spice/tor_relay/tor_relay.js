(function (env) {
    "use strict";
    env.ddg_spice_tor_relay = function(api_response) {

        if (!api_response || !api_response.relays.length) {
            return Spice.failed('tor_relay');
        }

        // TODO: support for bridges as well
        var query = DDG.get_query()
                    .replace(/\s*tor relay\s*/, "")
                    .replace(/\s*onion relay\s*/, "");

        if (api_response.relays.length > 1) {
            var sourceUrl = 'https://globe.torproject.org/#/search/query=' + encodeURIComponent(query),
                data = {
                    record_data: {
                        'To many results' : 'Visit the link below to see them all.'
                    }
                };
        }
        else {
            var sourceUrl = 'https://globe.torproject.org/#/relay/' + encodeURIComponent(api_response.relays[0].fingerprint),
                data = {
                    record_data : {}
                };

            // Parse the api_response.relays[0] structure to fit on the 'record' template
            data.record_data = {};
            for (var prop in api_response.relays[0]) {
                if (typeof(api_response.relays[0][prop]) === 'object')
                    data.record_data[prop.replace("_", " ")] = api_response.relays[0][prop].join(', ');
                else if (typeof(api_response.relays[0][prop]) !== 'string')
                    data.record_data[prop.replace("_", " ")] = api_response.relays[0][prop].toString();
                else
                    data.record_data[prop.replace("_", " ")] = api_response.relays[0][prop];
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
}(this));

