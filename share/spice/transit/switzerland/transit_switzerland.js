(function (env) {
    "use strict";
    env.ddg_spice_transit_switzerland = function(api_result) {

        if (!api_result || api_result.error || !api_result.to || !api_result.from || !api_result.connections) {
            return Spice.failed('switzerland');
        }
        
        var to = api_result.to.name || '',
            from = api_result.from.name || '';
        
        Spice.add({
            id: "transit_switzerland",
            name: "Swiss Trains",
            data: api_result.connections,
            meta: {
                primaryText: from + " to " + to,
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
                return {
                    arrival_time: format_time(item.to.arrival),
                    departure_time: format_time(item.from.departure),
                    name: item.sections[0].journey.name,
                    platform: item.from.platform,
                    status: (item.from.delay) ? 'Delayed' : 'On time',
                    status_class: (item.from.delay) ? 'switzerland__delayed' : '',
                    transfers: format_transfers(item.transfers),
                    url: 'http://transport.opendata.ch/examples/connections.php?from=' + from + '&to=' + to
                }
            }
        });
    };
    
    // Extract time only from datetime, e.g. "2015-03-04T13:32:00+0100"
    function format_time(departure) {
        var dep_array = departure.split('T');
        var time = dep_array[1];
        return time.substr(0, 5);
    }
    
    // Make the transfers output format more human-readable
    function format_transfers(transfers) {
        var plural = (transfers === 1) ? '' : 's';
        transfers = (!transfers) ? 'No' : transfers;
        return transfers + ' transfer' + plural;
    }
}(this));
