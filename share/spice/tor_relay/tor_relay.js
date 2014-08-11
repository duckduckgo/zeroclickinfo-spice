(function (env) {
    "use strict";
    env.ddg_spice_tor_relay = function(api_response) {

        if (!api_response) {
            return Spice.failed('tor_relay');
        }

        // TODO: support for bridges as well
        var query       = DDG.get_query()
                            .replace(/^\s*tor relay\s+/, "")
                            .replace(/^\s*onion relay\s+/, ""),
            result      = api_response,
            data        = {
                            record_data : {
                              'Error' :'To many results. Visit the link below to see them all.'
                            }
                          },
            sourceUrl   = 'https://globe.torproject.org/#/search/query=' + encodeURIComponent(query);

        if (result.relays.length === 0) {
            return Spice.failed('tor_relay');
        }
        else if(result.relays.length === 1) {
            var sourceUrl       = 'https://globe.torproject.org/#/relay/' + encodeURIComponent(result.relays[0].fingerprint);

            // Parse the result.relays[0] structure to fit on the 'record' template
            data.record_data    = {};
            for (var prop in result.relays[0]) {
                if(typeof(result.relays[0][prop]) === 'object')
                    data.record_data[prop] = result.relays[0][prop].join(', ');
                if(typeof(result.relays[0][prop]) !== 'string')
                    data.record_data[prop] = result.relays[0][prop].toString();
                else
                    data.record_data[prop] = result.relays[0][prop];
            }
        }

        Spice.add({
            id          : 'tor_relay',
            name        : 'Tor Relay Status',
            data        : data,
            meta: {
                sourceUrl   : sourceUrl,
                sourceName  : 'Globe'
            },
            templates: {
                group   : 'base',
                options : {
                    content         : 'record',
                    rowHighlight    : false,
                    moreAt          : true
                }
            },
        });
    };
}(this));

