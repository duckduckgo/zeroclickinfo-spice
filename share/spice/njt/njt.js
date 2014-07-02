(function (env){
    "use strict";
    env.ddg_spice_njt = function(api_result){
        if (!api_result || api_result.failed){
            return Spice.failed('njt');
        }

        var sorted = api_result.routes.sort(function(a, b){
            return timeInMins(a.departure_time) - timeInMins(b.departure_time);
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
            normalize: function(item){
                var status_class = "",
                    cancelled = false,
                    classes = {
                        "Cancelled": "njt__cancelled",
                        "Delayed": "njt__delayed",
                        "All Aboard": "njt__allaboard",
                        "Boarding": "njt__boarding",
                        "Stand By": "njt__boarding"
                    };

                if (!item.status) item.status = "On Time";
                return {
                    departure_time: actualDepartureTime(item),
                    arrival_time: format_time(timeInMins(item.arrival_time)),
                    status: actualStatus(item),
                    line: item.line.replace('Line', ''),
                    cancelled: item.status === "Cancelled",
                    status_class: delayedMins(item) > 0 ? "njt__delayed" : classes[item.status]
                };
            }
        });
    };

    function padZeros(n, len){
        var s = n.toString();
        while (s.length < len){
            s = '0' + s;
        }
        return s;
    }

    //takes a time in minutes and converts it to human-readable (2:05 PM)
    function format_time(t){
        var hour = Math.floor(t / 60),
            minute = t % 60,
            ampm = (hour >= 24) ? 'AM' : (hour >= 12) ? 'PM' : 'AM';
        if (hour > 24){
            hour -= 24;
        } else if (hour > 12) {
            hour -= 12;
        }
        return hour + ':' + padZeros(minute, 2) + ' ' + ampm;
    }

    function timeInMins(t){
        var hour = parseInt(t.split(':')[0]),
            minute = parseInt(t.split(':')[1]);
        return hour*60 + minute;
    }

    //find how many minutes the train is delayed
    function delayedMins(item){
        var match = new RegExp(/In (\d+) Min/).exec(item.status);
        if (match && match.length > 1){
            var mins = parseInt(match[1]),
                now = new Date(),
                nmins = now.getMinutes(),
                nhours = now.getHours();
            return (nhours*60 + nmins + mins) - timeInMins(item.departure_time);
        }
        return 0;
    }

    function actualDepartureTime(item){
        return format_time(timeInMins(item.departure_time) + delayedMins(item));
    }

    function actualStatus(item){
        if (delayedMins(item) > 0){
            return 'Delayed from ' + format_time(timeInMins(item.departure_time));
        }
        if (item.status === "Boarding") {
            return 'Now Boarding'
        }
        var match = new RegExp(/In (\d+) Min/).exec(item.status);
        if (match && match.length > 1){
            return 'Departs in ' + match[1] + 'm';
        }
        return item.status;
    }
}(this));