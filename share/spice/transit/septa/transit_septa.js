(function(env){
    "use strict";
    env.ddg_spice_transit_septa = function(api_result){

        if (!api_result ||
                api_result.length < 1 ||
                !api_result[0].orig_line ||
                !api_result[0].orig_departure_time ||
                !api_result[0].orig_delay) {
            return Spice.failed('septa');
        }

        var script = $("[src*='js/spice/transit/septa/']")[0],
            source = decodeURI($(script).attr("src")),
            parts = source.split('/'),
            from = parts[5],
            to = parts[6],
            now = timeInMins(new Date().toTimeString());

        Spice.add({
            id: 'transit_septa',
            name: 'SEPTA',
            data: api_result,
            signal: 'high',
            meta: {
                primaryText: from + " to " + to,
                sourceName: 'SEPTA',
                sourceUrl: 'http://www.septa.org/schedules/rail/index.html',
                sourceIconUrl: 'http://septa.org/site/images/favicon.ico'
            },
            normalize: function(item) {
                var classes = {
                        "Suspended": "septa__cancelled",
                        "Delayed": "septa__delayed"
                    };

                return {
                    departure_time: format_time(actualDepartureTime(item)),
                    arrival_time: format_time(actualArrivalTime(item)),
                    line: item.orig_line.replace(' Line', '') + ' Line',
                    url: 'http://www.septa.org/schedules/rail/index.html',
                    status:  actualStatus(item),
                    status_class: delayedMins(item.orig_delay) > 0 ? 'septa__delayed' : classes[item.orig_delay],
                    cancelled: (status === "Suspended")
                };
            },
            templates: {
                group: 'base',
                detail: false,
                item_detail: false,
                options: {
                    content: Spice.transit_septa.train_item
                }
            },
            sort_fields: {
                time: function(a, b) {
                    var c = actualDepartureTime(a),
                        d = actualDepartureTime(b);
                    c = (c + 5 < now) ? c + 24*60 : c; //push times from the next day to the end of the list
                    d = (d + 5 < now) ? d + 24*60 : d;
                    return c - d;
                }
            },
            sort_default: 'time',
            onShow: function(){
                $('.septa__cancelled').parents('.tile__body').addClass('septa__cancelled-tile');
            }
        });
    }

    var delayed_regex = new RegExp(/(\d+) mins/)

    function padZeros(n, len) {
        var s = n.toString();
        while (s.length < len) {
            s = '0' + s;
        }
        return s;
    }

    //takes a time in minutes (integer) and converts it to human-readable (string like 2:05 PM)
    function format_time(t) {
        var hour = Math.floor(t / 60),
            minute = t % 60,
            ampm = (hour >= 12) ? 'PM' : 'AM';

        if (hour > 12) {
            hour -= 12;
        }
        if (hour === 0){
            hour = 12;
        }
        return hour + ':' + padZeros(minute, 2) + ' ' + ampm;
    }

    function timeInMins(t) {
        var hour = parseInt(t.split(':')[0]),
            minute = parseInt(t.split(':')[1]),
            ampm = 0;
        if (t.indexOf('PM') > -1 && hour !== 12) {
            ampm = 60*12;
        } else if (t.indexOf('AM') > -1 && hour === 12) {
            ampm = -60*12;
        }
        return hour*60 + minute + ampm;
    }

    function delayedMins(status) {
        var match = delayed_regex.exec(status);
        if (match && match.length > 1){
            return parseInt(match[1]);
        }
        return 0;
    }

    function actualDepartureTime(item) {
        return timeInMins(item.orig_departure_time) + delayedMins(item.orig_delay);
    }

    function actualArrivalTime(item) {
        return timeInMins(item.orig_arrival_time) + delayedMins(item.orig_delay);
    }

    function actualStatus(item) {
        if (delayedMins(item.orig_delay) > 0) {
            return "Delayed from " + format_time(timeInMins(item.orig_departure_time));
        }
        return item.orig_delay;
    }
}(this));
