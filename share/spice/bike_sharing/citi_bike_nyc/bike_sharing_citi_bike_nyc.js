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

    env.ddg_spice_bike_sharing_citi_bike_nyc = function(api_result) {
        if (!api_result || !api_result.stationBeanList) {
            return Spice.failed('citi_bike_nyc');
        }

        var script = $('[src*="/js/spice/bike_sharing/citi_bike_nyc/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/citi_bike_nyc\/([^\/]+)/)[1];

        DDG.require(['moment.js', 'maps'], function() {
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
                    primaryText: 'Showing ' + api_result.stationBeanList.length + ' Stations',
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
                data: api_result.stationBeanList,
                normalize: function(item) {
                    if (item.testStation || item.statusKey != 1) {
                        return null;
                    }
                    if (references[query]) {
                        var pointOfReference = L.latLng(references[query]);
                    }
                    return {
                        name: item.stationName,
                        lat: item.latitude,
                        lon: item.longitude,
                        distanceToReference: pointOfReference ? L.latLng(item.latitude, item.longitude).distanceTo(pointOfReference) : item.id,
                        title: item.stationName,
                        availableDocks: item.availableDocks,
                        availableBikes: item.availableBikes,
                        lastCommunication: moment(new Date(item.lastCommunicationTime)).fromNow()
                    };
                }
            });
        });
    }
}(this));
