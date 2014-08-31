(function (env){
    "use strict";
    env.ddg_spice_transit_mbta = function(api_result) {
        if (!api_result || api_result.failed){
            return Spice.failed('mbta');
        }

        //The trips that serve a stop are organized by mode (subway, bus, etc). We'll put them in a single array.
        var trips = []
        for (var i = 0; i < api_result.mode.length; i++) {
            var mode = api_result.mode[i];
            for (var ii = 0; ii < mode.route.length; ii++) {
                var route = mode.route[ii];
                for (var iii = 0; iii < route.direction.length; iii++) {
                    var direction = route.direction[iii];
                    for (var iv = 0; iv < direction.trip.length; iv++) {
                        var trip = direction.trip[iv];
                        trip.mode_name = mode.mode_name; //add these so we don't lose them when we denormalize
                        trip.route_name = route.route_name;
                        trip.direction_name = direction.direction_name;

                        var dep =  new Date(trip.sch_dep_dt*1000);
                        trip.departs = padZeros(dep.getHours(), 2) + ":" + padZeros(dep.getMinutes(), 2);

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
