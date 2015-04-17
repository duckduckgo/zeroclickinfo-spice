(function (env) {
    "use strict";
    env.ddg_spice_transit_switzerland = function(api_result) {

        if (!api_result || api_result.error || !api_result.to || !api_result.from || !api_result.connections) {
            return Spice.failed('switzerland');
        }

        var to = api_result.to.name || '',
            from = api_result.from.name || '';

        DDG.require('moment.js', function() {
            Spice.add({
                id: "switzerland",
                name: "Swiss Trains",
                data: api_result.connections,
                meta: {
                    heading: from + " to " + to,
                    sourceName: "transport.opendata.ch",
                    sourceUrl: 'http://transport.opendata.ch/examples/connections.php?from=' + from + '&to=' + to
                },
                templates: {
                    group: 'base',
                    detail: false,
                    item_detail: false,
                    options: {
                        content: Spice.transit_switzerland.train_item,
                        moreAt: true
                    }
                },
                normalize: function(item){
                    console.log(item);
                    return {
                        arrival_time: moment(item.to.arrival).zone(item.to.arrival).format('LT'),
                        departure_time: moment(item.from.departure).zone(item.from.departure).format('LT'),
                        name: item.sections[0].journey.name,
                        platform: item.from.platform,
                        status: (item.from.delay) ? 'Delayed' : 'On time',
                        status_class: (item.from.delay) ? 'switzerland__delayed' : '',
                        transfers: format_transfers(item.transfers),
                        url: 'http://transport.opendata.ch/examples/connections.php?from=' + from + '&to=' + to
                    }
                }
            });
        })
    };

    // Make the transfers output format more human-readable
    function format_transfers(transfers) {
        var plural = (transfers === 1) ? '' : 's';
        transfers = (!transfers) ? 'No' : transfers;
        return transfers + ' transfer' + plural;
    }
}(this));
