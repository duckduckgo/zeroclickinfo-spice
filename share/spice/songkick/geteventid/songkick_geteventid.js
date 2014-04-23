(function(env) {
    "use strict";

    $.ajaxSetup({
	cache: true
    });

    var metadata = {};
    env.ddg_spice_songkick_geteventid = function(api_result) {

	if(!api_result || !api_result.resultsPage || !api_result.resultsPage.results) {
	    return;
	}

	if(api_result.resultsPage.results.totalEntries === 0 || api_result.resultsPage.results.length === 0) {
	    return;
	}

	if(!api_result.resultsPage.results.location || api_result.resultsPage.results.location.length === 0) {
	    return;
	}

	var considered_location = api_result.resultsPage.results.location[0];
	var metro_area_id = considered_location.metroArea.id;
	metadata = {
	    metro_area_uri: considered_location.metroArea.uri,
	    city: considered_location.city.displayName,
	    metro_area: considered_location.metroArea.displayName
	};
	
	$.getScript("/js/spice/songkick/events/" + metro_area_id);
    };

    function padding(t) {
	return  +t < 10 ? "0" + t : t;
    }

    function twelve_hour(t) {
	if(!t) {
	    return;
	}
	
	var time = t.split(/:/),
	    hours = +time[0],
	    minutes = +time[1];

	return hours % 12 + ":" + padding(minutes) + (hours > 12 ? 'PM' : 'AM'); 
    }

    env.ddg_spice_songkick_events = function(api_result) {
	var events = api_result.resultsPage.results.event;

	Spice.add({
	    id: 'songkick',
	    name: 'Concerts',
	    data: events,
	    meta: {
		sourceName: 'Songkick',
		sourceUrl: encodeURI(metadata.metro_area_uri),
		sourceIcon: true,
		itemType: 'Concerts in ' + metadata.city
	    },
	    normalize: function(o) {
		if(o.performance.length > 0 && o.venue.displayName !== "Unknown venue") {
		    var a = {
			city: metadata.city,
			metro_area: metadata.metro_area,
			artist: o.performance[0].displayName,
			venue: o.venue.displayName,
			start: {
			    date: o.start.date,
			    time: twelve_hour(o.start.time)
			}
		    };

		    return a;
		}

		return null;
	    },
	    templates: {
		item: Spice.songkick_geteventid.item
	    },
	    relevancy: {
		skip_words: [
		    'concert',
		    'concerts'
		]
	    }
	});
    };
}(this));
