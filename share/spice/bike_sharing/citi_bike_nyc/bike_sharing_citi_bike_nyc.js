(function(env) {
    "use strict";

    var references = {
        manhattan: {
            lat: 40.7590615,
            lon: -73.969231
        },
        brooklyn: {
            lat: 40.645244,
            lon: -73.9449975
        },
        queens: {
            lat: 40.651018,
            lon: -73.87119
        }
    };

    function get_query() {
        var script = $('[src*="/js/spice/bike_sharing/citi_bike_nyc/"]')[0],
            source = $(script).attr("src");
        return source.match(/citi_bike_nyc\/([^\/]+)/)[1];
    }

    env.ddg_spice_bike_sharing_citi_bike_nyc = function(api_result) {
        if (!api_result || !api_result.data || !api_result.data.stations) {
            return Spice.failed('citi_bike_nyc');
        }

        $.getJSON('/js/spice/bike_sharing/citibike_nyc_status/')
            .done(function(status_api_result) {
                if (!status_api_result || !status_api_result.data || !status_api_result.data.stations) {
                    return Spice.failed('citi_bike_nyc');
                }

                var stations_information = api_result.data.stations.reduce(function(stations, station) {
                    stations[station.station_id] = station;
                    return stations;
                }, {});

                var full_data = status_api_result.data.stations.map(function(station_status) {
                    var station_information = stations_information[station_status.station_id];
                    if (station_information) {
                        return $.extend({}, station_status, station_information);
                    }
                    return null;
                }).filter(function(station) {
                    return station && station.is_installed;
                });

                var query = get_query();

                DDG.require(['moment.js', 'maps'], function() {
                    var pointOfReference = references[query] ? L.latLng(references[query]) : null;
                    moment.locale('en', {
                        relativeTime : {
                            past: "%s ago",
                            s:    "1 sec",
                            ss:   "%d sec",
                            m:    "1 min",
                            mm:   "%d min",
                            h:    "1 hour",
                            hh:   "%d hours",
                            d:    "1 day",
                            dd:   "%d days",
                            M:    "1 month",
                            MM:   "%d months",
                            y:    "1 year",
                            yy:   "%d years"
                        }
                    });
                    Spice.add({
                        id: 'citi_bike_nyc',
                        name: 'Bike Sharing',
                        meta: {
                            sourceName: 'Citi Bike NYC',
                            sourceUrl: 'https://www.citibikenyc.com/stations',
                            primaryText: 'Showing ' + full_data.length + ' Stations',
                            pinIcon: 'ddgsi-circle',
                            pinIconSelected: 'ddgsi-star'
                        },
                        model: 'Place',
                        view: 'Places',
                        templates: {
                            item: 'base_item',
                            options: {
                                content: Spice.bike_sharing_citi_bike_nyc.content
                            },
                            variants: {
                                tile: 'narrow'
                            }
                        },
                        sort_fields: {
                            distance: function(a, b) {
                                return a.distanceToReference - b.distanceToReference;
                            }
                        },
                        sort_default: 'distance',
                        data: full_data,
                        normalize: function(station) {
                            return {
                                name: station.name,
                                lat: station.lat,
                                lon: station.lon,
                                distanceToReference: pointOfReference ? L.latLng(station.lat, station.lon).distanceTo(pointOfReference) : station.station_id,
                                title: station.name,
                                availableDocks: station.num_docks_available,
                                availableBikes: station.num_bikes_available,
                                lastCommunication: moment(new Date(parseInt(station.last_reported)*1000)).fromNow()
                            };
                        }
                    });
                });
        });
    }
}(this));
