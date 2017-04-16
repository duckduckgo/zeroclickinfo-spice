(function (env){
    "use strict";
    env.ddg_spice_transit_mbta = function(api_result) {
        if (!api_result || api_result.failed){
            return Spice.failed('mbta');
        }

        var query = DDG.get_query();    //is the user interested in inbound, outbound, or both?
        var inbound = (query.indexOf("inbound") > -1);
        var outbound = (query.indexOf("outbound") > -1);
        if (!inbound && !outbound) {    //if neither is specified, show both
            outbound = true;
            inbound = true;
        }

        //The trips that serve a stop are organized by mode (subway, bus, etc). We'll put them in a single array.
        var trips = []
        for (var i = 0; i < api_result.mode.length; i++) {
            var mode = api_result.mode[i];
            if (mode.mode_name !== "Commuter Rail") {   //skip anything other than rail
                continue
            }
            for (var ii = 0; ii < mode.route.length; ii++) {
                var route = mode.route[ii];
                for (var iii = 0; iii < route.direction.length; iii++) {
                    var direction = route.direction[iii];
                    if ((direction.direction_name === "Inbound" && !inbound) || (direction.direction_name === "Outbound" && !outbound)) {
                        continue;
                    }
                    for (var iv = 0; iv < direction.trip.length; iv++) {
                        var trip = direction.trip[iv];
                        trip.mode_name = mode.mode_name; //add these so we don't lose them when we denormalize
                        trip.route_name = route.route_name;
                        trip.direction_name = direction.direction_name;
                        trip.train_num = trip.trip_name.split(" ")[0];

                        var dep =  new Date(trip.sch_dep_dt*1000);
                        var hours = dep.getHours();
                        var ampm;
                        if (hours > 12) {
                            hours -= 12;
                            ampm = "pm";
                        } else {
                            if (hours === 0) {
                                hours = 12;
                            }
                            ampm = "am";
                        }
                        trip.departs = hours + ":" + padZeros(dep.getMinutes(), 2) + " " + ampm;

                        trips.push(trip);
                    }
                }
            }
        }

        Spice.add({
            id: 'mbta',
            name: 'MBTA',
            data: trips,
            meta: {
                heading: "Trains from " + api_result.stop_name,
                sourceUrl: "http://mbta.com/schedules_and_maps/rail/", //FIXME Is there a way to link to a specific station's schedule?
                sourceName: "MBTA"
            },
            sort_fields: {
                departure: function(a, b) {
                    return a.sch_dep_dt < b.sch_dep_dt ? -1 : (a.sch_dep_dt > b.sch_dep_dt ? 1 : 0);
                }
            },
            sort_default: "departure",
            templates: {
                group: 'base',
                detail: false,
                item_detail: false,
                options: {
                    content: Spice.transit_mbta.item
                }
            }
        });

        function padZeros(n, len) {
            var s = n.toString();
            while (s.length < len) {
                s = '0' + s;
            }
            return s;
        }

    };

}(this));
