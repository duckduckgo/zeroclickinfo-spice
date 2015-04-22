(function (env) {
    "use strict";

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

                    // exclude events that have already ended
                    if ( moment(item.end_date).isBefore($.now()) ){
                        return null;
                    }

                    return {
                        url: buildUrl(item.id),
                        name: item.name,
                        description: DDG.strip_html(item.description),
                        place: item.venue.name,
                        city: item.venue.city,
                        image: item.image_large_url,
                        start_end: getStartEnd(item.start_date,item.end_date),
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

    function buildUrl(id) {
        return 'https://getevents.co/events/preview/'+id;
    }

    function getStartEnd(s, e) {
        var start = moment(s),
            dates = {
                start: start.format('MMM D'),
                end:   null,
                hours: null
            };

        if (e.length && moment(e).isAfter(start) ){
            var end = moment(e),
                diff = start.diff(end, 'days');

            // Check if event ends same day
            // if so, display timespan
            if (diff > 0) {
                dates.end = end.format('MMM D');
            } else {
                dates.hours = {
                    start: start.format('ha'),
                    end: end.format('ha')
                };
            }
        }

        return dates;
    }

   };
}(this));