(function(env) {
    "use strict";

    var references = {
        'san francisco': {
            lat: 37.7577,
            lon: -122.4376
        },
        'redwood city': {
            lat: 37.5081359,
            lon: -122.2139269
        },
        'palo alto': {
            lat: 37.42565,
            lon: -122.13535
        },
        'mountain view': {
            lat: 37.4133235,
            lon: -122.081267
        },
        'san jose': {
            lat: 37.2970155,
            lon: -121.817413
        }
    };

    references['sf'] = references['sfo'] = references['san francisco'];
    references['redwood'] = references['redwood city'];

    env.ddg_spice_bike_sharing_bay_area_bike_share_ca = function(api_result) {
        if (!api_result || !api_result.stationBeanList) {
            return Spice.failed('bay_area_bike_share_ca');
        }

        var script = $('[src*="/js/spice/bike_sharing/bay_area_bike_share_ca/"]')[0],
            source = $(script).attr("src"),
            query = source.match(/bay_area_bike_share_ca\/([^\/]+)/)[1];

        if (query) {
            query = decodeURIComponent(query);
        }

        DDG.require('moment.js', function() {
        DDG.require('maps', function() {
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
                id: 'bay_area_bike_share_ca',
                name: 'Bike Sharing',
                meta: {
                    sourceName: 'Bay Area Bike Share',
                    sourceUrl: 'http://www.bayareabikeshare.com/stations',
                    primaryText: 'Showing ' + api_result.stationBeanList.length + ' Stations',
                    pinIcon: 'ddgsi-circle',
                    pinIconSelected: 'ddgsi-star'
                },
                model: 'Place',
                view: 'Places',
                templates: {
                    group: 'text',
                    detail: false,
                    item_detail: false,
                    options: {
                        footer: Spice.bike_sharing_bay_area_bike_share_ca.footer
                    },
                    variants: {
                        tile: 'narrow',
                        tileTitle: "3line"
                    },
                    elClass: {
                        tileTitle: "tx--14"
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
                        availableBikes: item.availableBikes
                    };
                }
            });
            });
        });
    }
}(this));
