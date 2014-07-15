(function (env){
    "use strict";
    env.ddg_spice_njt = function(api_result) {
        if (!api_result || api_result.failed){
            return Spice.failed('njt');
        }

        var sorted = api_result.routes.sort(function(a, b){
            return actualDepartureTime(a) - actualDepartureTime(b);
        });

        Spice.add({
            id: 'njt',
            name: 'NJ Transit',
            data: sorted,
            meta: {
                heading: api_result.origin + " to " + api_result.destination,
                sourceUrl: api_result.url,
                sourceName: "NJ Transit"
            },
            templates: {
                item_custom: Spice.njt.train_item
            },
            normalize: function(item) {
                var now = timeInMins(api_result.now),
                    classes = {
                        "Cancelled": "njt__cancelled",
                        "Delayed": "njt__delayed",
                        "All Aboard": "njt__allaboard",
                        "Boarding": "njt__boarding",
                        "Stand By": "njt__boarding"
                    };

                if (!item.status) item.status = "On Time";
                return {
                    departure_time: format_time(actualDepartureTime(item, now)),
                    arrival_time: format_time(actualArrivalTime(item, now)),
                    status: actualStatus(item, now),
                    line: item.line.replace('Line', ''),
                    cancelled: item.status === "Cancelled",
                    status_class: delayedMins(item, now) > 0 ? "njt__delayed" : classes[item.status]
                };
            }
        });
    };

    var delayed_regex = new RegExp(/In (\d+) Min/);

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
            ampm = (hour >= 24) ? 'AM' : (hour >= 12) ? 'PM' : 'AM';
        if (hour > 24) {
            hour -= 24;
        } else if (hour > 12) {
            hour -= 12;
        }
        return hour + ':' + padZeros(minute, 2) + ' ' + ampm;
    }

    //converts a time string (like 14:05) and converts it to integer minutes
    function timeInMins(t) {
        var hour = parseInt(t.split(':')[0]),
            minute = parseInt(t.split(':')[1]);
        return hour*60 + minute;
    }

    //find how many minutes the train is delayed
    function delayedMins(item, now) {
        var match = delayed_regex.exec(item.status);
        if (match && match.length > 1){
            var mins = parseInt(match[1]);
            return (now + mins) - timeInMins(item.departure_time);
        }
        return 0;
    }

    //departure time adjusted for delay
    function actualDepartureTime(item, now) {
        return timeInMins(item.departure_time) + delayedMins(item, now);
    }

    //arrival time adjusted for delay
    function actualArrivalTime(item, now) {
        return timeInMins(item.arrival_time) + delayedMins(item, now);
    }

    //status adjusted for delay
    function actualStatus(item, now) {
        if (delayedMins(item, now) > 0) { //if it's delayed, tell the user the scheduled departure time
            return 'Delayed from ' + format_time(timeInMins(item.departure_time));
        }
        if (item.status === "Boarding") {
            return 'Now Boarding';
        }
        var match = delayed_regex.exec(item.status);
        if (match && match.length > 1) { //if we know when it departs, tell the user how many minutes
            return 'Departs in ' + match[1] + 'm';
        }
        return item.status;
    }
}(this));