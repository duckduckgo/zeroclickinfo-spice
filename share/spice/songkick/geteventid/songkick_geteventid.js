function twenty_four_to_twelve_hour_time(t) {
  "use strict";
  var a = t.split(/:/);
  a[0] = parseInt(a[0]);
  if (a[0] > 12) {
    a = [a[0] - 12, a[1], 'PM'];
  } else {
    a = [a[0], a[1], ((a[0] == 12) ? 'PM' : 'AM')];
  }
  a[0] += '';
  return a[0] + ':' + a[1] + ' ' + a[2];
}

function ddg_spice_songkick_geteventid(api_result) {
  "use strict";
  // Taken from
  //   http://www.songkick.com/developer/location-search
  // {"resultsPage":
  //   {"results":
  //     {"location":[
  //       {"city":{"displayName":"London",
  //         "country":{"displayName":"UK"},
  //         "lng":-0.128,"lat":51.5078},
  //         "metroArea":{"uri":"http://www.songkick.com/metro_areas/24426-uk-london",
  //           "displayName":"London",
  //           "country":{"displayName":"UK"},
  //           "id":24426,
  //           "lng":-0.128,"lat":51.5078}
  //       },
  //       {"city":{"displayName":"London",
  //         "country":{"displayName":"US"},
  //         "lng":null,"lat":null,
  //         "state":{"displayName":"KY"}},
  //         "metroArea":{"uri":"http://www.songkick.com/metro_areas/24580",
  //           "displayName":"Lexington",
  //           "country":{"displayName":"US"},
  //           "id":24580,
  //           "lng":-84.4947,"lat":38.0297,
  //           "state":{"displayName":"KY"}}
  //       }
  //     ]},
  //   "totalEntries":2,"perPage":10,"page":1,"status":"ok"}
  // }
  // At this point, we have the metro_area_id, so we can get the list of
  // concerts.
  if (!api_result.resultsPage || !api_result.resultsPage.results || !api_result.resultsPage.results.length == 0) {
    return;
  }
  if (api_result.resultsPage.results.location.size == 0) {
    return;
  }

  // Prevent jQuery from appending "_={timestamp}" in our url.
  $.ajaxSetup({
    cache: true
  });
  
  var metro_area_id = api_result.resultsPage.results.location[0].metroArea.id;
  var metadata = {
    metro_area_uri : api_result.resultsPage.results.location[0].metroArea.uri
  };
  ddg_spice_songkick_geteventid.metadata = metadata;
  
  $.getScript("/js/spice/songkick/events/" + metro_area_id);
}

function ddg_spice_songkick_events(events_data) {
  "use strict";
  var max_results = 5;
  // Taken from
  //   http://www.songkick.com/developer/upcoming-events-for-metro-area
  // {"resultsPage:" {
  //   "results": { "event": [
  //     {"id":11129128,
  //       "type":"Concert",
  //       "uri":"http://www.songkick.com/concerts/11129128-wild-flag-at-fillmore?utm_source=PARTNER_ID&utm_medium=partner",
  //       "displayName":"Wild Flag at The Fillmore (April 18, 2012)",
  //       "start":{"time":"20:00:00",
  //         "date":"2012-04-18",
  //         "datetime":"2012-04-18T20:00:00-0800"},
  //       "performance":[{"artist":{"uri":"http://www.songkick.com/artists/29835-wild-flag?utm_source=PARTNER_ID&utm_medium=partner",
  //         "displayName":"Wild Flag","id":29835,"identifier":[]},
  //         "displayName":"Wild Flag",
  //         "billingIndex":1,
  //         "id":21579303,
  //         "billing":"headline"}],
  //       "location":{"city":"San Francisco, CA, US","lng":-122.4332937,"lat":37.7842398},
  //       "venue":{"id":6239,
  //         "displayName":"The Fillmore",
  //         "uri":"http://www.songkick.com/venues/6239-fillmore?utm_source=PARTNER_ID&utm_medium=partner",
  //         "lng":-122.4332937, "lat":37.7842398,
  //         "metroArea":{"uri":"http://www.songkick.com/metro_areas/26330-us-sf-bay-area?utm_source=PARTNER_ID&utm_medium=partner",
  //           "displayName":"SF Bay Area",
  //           "country":{"displayName":"US"},
  //           "id":26330,
  //           "state":{"displayName":"CA"}}},
  //       "status":"ok",
  //       "popularity":0.012763
  //     }, ....
  //   ]},
  //   "totalEntries":24,
  //   "perPage":50,
  //   "page":1,
  //   "status":"ok"}
  // }
  if (!events_data.resultsPage || !events_data.resultsPage.results || !events_data.resultsPage.results.event) {
    return;
  }
  var city_name = events_data.resultsPage.results.event[0].location.city;
  Spice.render({
    data : {
      events: $(events_data.resultsPage.results.event.slice(0, max_results)).map(function(idx, o) {
        return {
          uri         : o.uri,
          displayName : o.displayName,
          start       : {
            date : o.start.date,
            time : twenty_four_to_twelve_hour_time(o.start.time)
          }
        };
      })
    },
    header1          : 'Events in ' + city_name + ' (Songkick)',
    source_url       : encodeURI(ddg_spice_songkick_geteventid.metadata.metro_area_uri),
    source_name      : 'Songkick',
    template_normal  : 'songkick_events',
    force_big_header : true,
    force_no_fold    : true
  });
}
