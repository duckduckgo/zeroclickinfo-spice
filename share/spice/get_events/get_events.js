(function (env) {
    "use strict";

    env.ddg_spice_get_events = function(api_result){
        if (!api_result || api_result.error) {
            return Spice.failed('get_events');
        }

        DDG.require(['maps', 'moment.js'], function(){
            Spice.add({
                id: "get_events",
                name: "Events",
                model: "Place",
                view: "Places",
                signal: "high",
                data: api_result.events,
                meta: {
                    sourceName: "GetEvents",
                    sourceUrl: 'http://getevents.co',
                    primaryText: "Upcoming Events",
                    formattedSourceName: 'More at GetEvents',
                    snippetChars: 110
                },
                normalize: function(item){

                    // exclude events that have already ended
                    if ( moment(item.end_date).isBefore($.now()) ){
                        return null;
                    }
                    return {
                        data_front: {
                            showPin: true,
                            title: item.name,
                            venue: item.venue,
                            image: item.image_large_url,
                            altSubtitle: formatSubtitleString(item),
                            
                            footer_content: Spice.get_events.foot_front,
                            
                            footLines: '4',
                            titleClass: 'tile__title--3 tx--16 tx--bold mg--none',
                            altSubClass: 'tx--13 tx-clr--grey'
                        },
                        data_back: {
                            title: item.name,
                            url: buildUrl(item.id),
                            description: item.description ? DDG.strip_html(item.description) : 'No description available.',
                            
                            footer_content: Spice.get_events.foot_back,
                            
                            titleClass: 'tile__title--1 tx--16 tx--bold'
                        },
                        city: item.venue.city,
                        place: item.venue.name,
                        lat: item.venue.lat,
                        lon: item.venue.lng
                    };
                },
                templates: {
                    group: 'places',
                    item: 'basic_flipping_item',
                    variants: {
                        tileSnippet: 'large'
                    },
                    elClass: {
                        tileSnippet: 'tx-clr--slate-light tx--13'
                    }
                }
            });
        });

    function buildUrl(id) {
        return 'https://getevents.co/events/preview/'+id;
    }
        
    function checkFullDay(s, e) {
        var dates = getStartEnd(s, e);
        if ((dates.plain_start.format('H:mm')=='0:00') && (dates.plain_end.format('H:mm')=='23:59')) {
            return true;
        }
        return false;
    }

    function getStartEnd(s, e) {
        var start = moment(s).utc(),
            dates = {
                start: start.format('MMM D'),
                end:   null,
                hours: null,
                plain_start: start
            };

        if (e.length && moment(e).isAfter(start) ){
            var end = moment(e).utc(),
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
            dates.plain_end = end;
        }

        return dates;
    }
    
    function formatSubtitleString(obj) {
        var startEnd = getStartEnd(obj.start_date, obj.end_date),
            fullDay = checkFullDay(obj.start_date, obj.end_date),
            startStr = startEnd.start || '';
        
        if (fullDay) {
            return startStr + ', All Day';
        } else {
            if (startStr && startEnd.hours) {
                startStr += ', ' + startEnd.hours.start + '-' + startEnd.hours.end;
            }
            if (startStr && startEnd.end) {
                startStr += '-' + startEnd.end;
            }
        }
        
        return startStr;
    }

   };
}(this));
