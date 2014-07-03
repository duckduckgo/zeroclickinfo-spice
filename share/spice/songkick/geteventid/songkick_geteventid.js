(function(env) {
    "use strict";

    $.ajaxSetup({cache: true});

    var metadata = {};
    
    env.ddg_spice_songkick_geteventid = function(api_result) {
        var totalEntries = DDG.getProperty(api_result, 'resultsPage.totalEntries'),
            location = DDG.getProperty(api_result, 'resultsPage.results.location'),
            considered_location = DDG.getProperty(api_result, 'resultsPage.results.location.0')

        if(!(totalEntries && location.length)) {
            return;
        }

        var metro_area_id = considered_location.metroArea.id;

        metadata = {
            metro_area_uri: considered_location.metroArea.uri,
            city: considered_location.city.displayName,
            metro_area: considered_location.metroArea.displayName
        };

        $.getScript("/js/spice/songkick/events/" + metro_area_id);
    };

    env.ddg_spice_songkick_events = function(api_result) {
        var events = api_result.resultsPage.results.event;

        Spice.add({
            id: 'songkick',
            name: 'Concerts',
            data: events,
            meta: {
                sourceName: 'Songkick',
                sourceUrl: encodeURI(metadata.metro_area_uri),
                searchTerm: metadata.city,
                itemType: 'Concerts'
            },
            normalize: function(item) {
                if(item.performance.length > 0 && item.venue.displayName !== "Unknown venue") {
                    return {
                        artist: item.performance[0].displayName,
                        venue: item.venue.displayName,
                        start: {
                            date: item.start.date,
                            time: twelve_hour(item.start.time)
                        },
            url: item.uri
                    };
                }

                return null;
            },
            templates: {
        group: 'base',
        options: {
            content: Spice.songkick_geteventid.content
        },
        detail: false,
        item_detail: false
            }
        });
    };

    // Pad timestring with '0' if needed
    function padding(t) {
        return  +t < 10 ? "0" + t : t;
    }

    // convert military time to 12H
    function twelve_hour(t) {
        if(!t) {
            return;
        }

        var time = t.split(/:/),
            hours = +time[0],
            minutes = +time[1];

        return hours % 12 + ":" + padding(minutes) + (hours > 12 ? 'PM' : 'AM'); 
    }
}(this));
