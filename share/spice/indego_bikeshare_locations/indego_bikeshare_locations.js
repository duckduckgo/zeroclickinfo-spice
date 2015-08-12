(function (env) {
    "use strict";

    env.ddg_spice_indegobikesharelocations = function(api_result) {
        if (!api_result || !api_result.features) {
            return Spice.failed('indegobikesharelocations');
        }

        function normalize(item) {
            if (item.features.properties.kioskPublicStatus != 'Active') {
                return null;
            }
            var subtitle = item.features.properties.bikesAvailable + ' bike' + (item.features.properties.bikesAvailable  == 1 ? '' : 's') + ' | ' + item.features.docksAvailable + ' dock' + (item.features.docksAvailable == 1 ? '' : 's');
            return {
                id: item.features.properties.kioskId,
                name: item.features.properties.name,
                lat: (item.features.geometry.coordinates[0]).toString(),
                lon: (item.features.geometry.coordinates[1]).toString(),
                url: 'https://www.rideindego.com/stations/',
                data_front: {
                    title: item.features.name,
                    altSubtitle: subtitle,
                },
                data_back: {
                    title: item.features.name,
                    altSubtitle: subtitle,
                    footer_content: Spice.indegobikesharelocations.foot_back,
                    lastCommunication: moment(new Date(item.features.lastCommunicationTime)).fromNow()

                }
            };
        }

        DDG.require('moment.js', function() {
        DDG.require('maps', function() {
            Spice.add({
                id: 'IndegoBikeSharePHL',
                name: 'Indego Bike Share PHL',
                meta: {
                    type: 'Indego Bike Share Locations',
                    sourceName: 'Ride Indego',
                    sourceUrl: 'http://www.rideindego.com/stations/',
                    itemType: 'station map'
                },
                model: 'Place',
                view: 'Places',
                templates: {
                    group: 'places',
                    item: 'basic_flipping_item',
                    variants: {
                        tile: 'basic4'
                    },
                },
                data: api_result.features,
                normalize: normalize        
            });
        });
        });
    }
}(this));
