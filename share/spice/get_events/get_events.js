(function (env) {
    "use strict";

    function buildUrl(id) {
        return 'https://getevents.co/events/preview/'+id;
    }

    function getAddress(obj) {
        var address = [];
        $.each(obj, function(k,v){
            if (k !== "country" && v.length){
                address.push(v);
            }
        });
        return address;
    }

    env.ddg_spice_get_events = function(api_result){
        if (api_result.error) {
            return Spice.failed('get_events');
        }

        DDG.require('maps', function(){
        DDG.require('moment.js', function(){
            Spice.add({
                id: "get_events",
                name: "Local Events",
                model: "Place",
                view: "Places",
                data: api_result.events,
                meta: {
                    sourceName: "GetEvents",
                    sourceUrl: 'http://getevents.co',
                    itemType: "Upcoming Local Events",
                    formattedSourceName: 'More on GetEvents'
                },
                normalize: function(item){
                    return {
                        url: buildUrl(item.id),
                        name: item.name,
                        description: item.description,
                        place: item.venue.name,
                        city: item.venue.city,
                        address_lines: getAddress(item.venue.address),
                        image: item.image_large_url,
                        start: moment(item.start_date).format('MMM D'),
                        end: moment(item.end_date).format('MMM D'),
                        lat: item.venue.lat,
                        lon: item.venue.lng,
                        meta: {
                            sourceName: item.source_name
                        }
                    };
                },
                templates: {
                    group: 'places',
                    item: Spice.get_events.item
                }
            });
        });
        });
   };
}(this));