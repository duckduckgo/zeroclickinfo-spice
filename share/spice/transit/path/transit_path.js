(function (env){
    "use strict";
    env.ddg_spice_transit_path = function(api_result){
        if (!api_result || api_result.failed){
            return Spice.failed('path');
        }

        Spice.add({
            id: 'transit_path',
            name: 'PATH',
            signal: 'high',
            data: api_result.routes,
            meta: {
                primaryText: api_result.origin + " to " + api_result.destination,
                sourceUrl: "http://www.panynj.gov/path/",
                sourceName: "PATH"
            },
            templates: {
                group: 'base',
                detail: false,
                item_detail: false,
                options: {
                    content: Spice.transit_path.train_item
                }
            },
            normalize: function(item){
                var route_replacements = {
                    "Journal Square - 33rd Street (via Hoboken)": "JSQ-HOB-33",
                    "Journal Square - 33rd Street": "JSQ-33",
                    "Hoboken - 33rd Street": "HOB-33",
                    "Hoboken - World Trade Center": "HOB-WTC",
                    "Newark - World Trade Center": "NWK-WTC"
                }
                return {
                    departure_time: format_time(item.departure_time),
                    arrival_time: format_time(item.arrival_time),
                    line: route_replacements[item.line]
                }
            }
        });
    }

    function padZeros(n, len) {
        var s = n.toString();
        while (s.length < len) {
            s = '0' + s;
        }
        return s;
    }   

    function format_time(t) {
        var hour = parseInt(t.split(':')[0]),
            minute = parseInt(t.split(':')[1]),
            ampm = (hour >= 24) ? 'AM' : (hour >= 12) ? 'PM' : 'AM';
        if (hour > 24) {
            hour -= 24;
        } else if (hour > 12) {
            hour -= 12;
        }
        if (hour === 0){
            hour = 12;
        }
        return hour + ':' + padZeros(minute, 2) + ' ' + ampm;
    }
}(this));
