(function (env) {
    "use strict";

    env.ddg_spice_bike_sharing_indego_phl = function(api_result){

        if (!api_result || !api_result.features) {
            return Spice.failed('bike_sharing_indego_phl');
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
                      id: 'bike_sharing_indego_phl',
                      name: 'Bike Sharing',
                      meta: {
                          sourceName: 'Ride Indego',
                          sourceUrl: 'http://www.rideindego.com/stations/',
                          itemType: 'Bike Stations',
                          pinIcon: 'ddgsi-circle',
                          pinIconSelected: 'ddgsi-star'
                      },
                      model: 'Place',
                      view: 'Places',
                      templates: {
                          item: 'base_item',
                          options: {
                              content: Spice.bike_sharing_indego_phl.content
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
                              title: item.properties.name,
                              docksAvailable: item.properties.docksAvailable,
                              bikesAvailable:item.properties.bikesAvailable,
                          };
                      }
                  });
              });
           });
        }
    }(this));
