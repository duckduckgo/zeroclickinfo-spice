(function(env) {
    "use strict";

    var references = {
       philadelphia: {
            lat: 39.9452735, 
            lon: -75.1485887      
           
           }
    };

    env.ddg_spice_indego_bikeshare_locations = function(api_result) {
        if (!api_result || !api_result.features) {
            return Spice.failed('indego_bikeshare_locations');
        }

       // var script = $('[src*="/js/spice/indego_bikeshare_locations/indego_bikeshare_locations/"]')[0],
         //   source = $(script).attr("src"),
        //    query = source.match(/indego_bikeshare_locations\/([^\/]+)/)[1];

        DDG.require('moment.js', function() {
            DDG.require('maps', function() {
             moment.locale('en', {
                    relativeTime : {
                        past:   "%s ago",
                        s:    "a sec",
                        ss:   "%d sec",
                        m:    "a min",
                        mm:   "%d min",
                        h:    "an hour",
                        hh:   "%d hours",
                        d:    "a day",
                        dd:   "%d days",
                        M:    "a month",
                        MM:   "%d months",
                        y:    "a year",
                        yy:   "%d years"
                    }
                });    
            
                Spice.add({
                    id: 'indego_bikeshare_locations',
                    name: 'Indego Bike Share',
                    meta: {
                        type: 'Indego Bike Share Philadelphia',
                        sourceName: 'Ride Indego',
                        sourceUrl: 'http://www.rideindego.com/stations/',
                        itemType: 'station map'
                    },
                    model: 'Place',
                    view: 'Places',
                    templates: {
                        item: 'base_item',
                        options: {
                            content: Spice.indego_bikeshare_locations.content
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
                    data: api_result.features,
                    normalize: function(item) {
                        if (item.geometry.length < 2 || item.geometry.length > 2 || item.properties.kioskPublicStatus !== 'Active') {
                            return null;
                        }
                        return {
                            name: item.properties.name,            
                            lat: (item.geometry.coordinates[1]).toString(),
                            lon: (item.geometry.coordinates[0]).toString(),    
                          //  distanceToReference: pointOfReference ? L.latLng(item.latitude, item.longitude).distanceTo(pointOfReference) : item.properties.kioskId,
                            title: item.properties.name,
                            docksAvailable: item.properties.docksAvailable,
                            bikesAvailable:item.properties.bikesAvailable,
                            lastCommunication: moment(new Date(item.lastCommunicationTime)).fromNow()
                        };
                    }
                });
            });
        });
    }
}(this));
