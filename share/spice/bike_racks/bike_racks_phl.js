(function (env) {
    "use strict";
   
    env.ddg_spice_bike_racks = function(api_result){

        if (!api_result || !api_result.features) {
            return Spice.failed('bike_racks');
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
                      id: 'bike_racks_phl',
                      name: 'Bike Racks',
                      meta: {
                          type: 'Bike Racks Locations',
                          sourceName: 'City of Philadelphia',
                          sourceUrl: 'https://www.opendataphilly.org/dataset/bike-rack-locations-in-philadelphia/resource/56c3d88a-b672-45d9-a855-317980d06842',
                          itemType: 'Bike Racks',
                          pinIcon: 'ddgsi-circle',
                          pinIconSelected: 'ddgsi-star'
                      },
                      model: 'Place',
                      view: 'Places',
                      templates: {
                          item: 'base_item',
                          options: {
                              content: Spice.bike_racks.content
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
                         
                          return {
                              name: item.properties.name,            
                              lat: item.geom.latitude,
                              lon: item.longitude,    
                              title: item.type,
                          
                              capacity:item.capacity,
                          };
                      }
                  });
              });
           });
        }
    }(this));

