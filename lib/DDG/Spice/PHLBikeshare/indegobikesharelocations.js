(function (env) {
    "use strict";

    env.ddg_spice_phlbikeshare_indegobikesharelocations = function(api_result) {
        if (!api_result || !api_result.features) {
            return Spice.failed('indegobikesharelocations');
        }

        function normalize(item) {
            if (item.properties.kioskPublicStatus != 'Active') {
                return null;
            }
            var subtitle = item.properties.bikesAvailable + ' bike' + (item.properties.bikesAvailable  == 1 ? '' : 's') + ' | ' + item.docksAvailable + ' dock' + (item.docksAvailable == 1 ? '' : 's');
            return {
                id: item.properties.kioskId,
                name: item.properties.name,
                lat: (item.geometry.coordinates[0]).toString(),
                lon: (item.geometry.coordinates[1]).toString(),
                url: 'https://www.rideindego.com/stations/',
                data_front: {
                    title: item.name,
                    altSubtitle: subtitle,
                },
                data_back: {
                    title: item.name,
                    altSubtitle: subtitle,
                    footer_content: Spice.phlbikeshare_indegobikesharelocations.foot_back,
                    lastCommunication: moment(new Date(item.lastCommunicationTime)).fromNow()

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
