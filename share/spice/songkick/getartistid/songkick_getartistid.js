function ddg_spice_songkick_getartistid(api_result) {
  "use strict";
  // Taken from
  //   https://www.songkick.com/developer/artist-search
  // {"resultsPage":
  //   {"results":
  //     {"artist":
  //       [{"uri":"http://www.songkick.com/artists/253846-radiohead",
  //         "displayName":"Radiohead",
  //         "id":253846,
  //         "onTourUntil":"2010-01-01"}
  //       ]
  //     },"totalEntries":1,"perPage":50,"page":1,"status":"ok"}}
  // At this point, we have the artist_id, so we can get the list of similar
  // artists.
  if (!api_result || !api_result.resultsPage || !api_result.resultsPage.results) {
    return;
  }
  if (api_result.resultsPage.results.length == 0 || api_result.resultsPage.results.artist.length == 0) {
    return;
  }

  // Prevent jQuery from appending "_={timestamp}" in our url.
  $.ajaxSetup({
    cache: true
  });
  
  var considered_artist = api_result.resultsPage.results.artist[0];
  if (!DDG.isRelevant(considered_artist.displayName, ['artists'])) {
    return;
  }
  var artist_id = considered_artist.id;
  var metadata = {
    artist_name : considered_artist.displayName,
    artist_uri  : considered_artist.uri
  };
  ddg_spice_songkick_getartistid.metadata = metadata;
  
  $.getScript("/js/spice/songkick/artists/" + artist_id);
}

function ddg_spice_songkick_artists(artists_data) {
  "use strict";
  var max_results = 10;
  var show_results = 3;
  // Taken from
  //   http://www.songkick.com/developer/similar-artists
  // {
  //   "resultsPage": {
  //     "results": {
  //       "artist": [
  //         {
  //           "displayName": "Gorillaz", 
  //           "id": 68043, 
  //           "identifier": [
  //             {
  //               "eventsHref": "http://api.songkick.com/api/3.0/artists/mbid:e21857d5-3256-4547-afb3-4b6ded592596/calendar.json", 
  //               "href": "http://api.songkick.com/api/3.0/artists/mbid:e21857d5-3256-4547-afb3-4b6ded592596.json", 
  //               "mbid": "e21857d5-3256-4547-afb3-4b6ded592596", 
  //               "setlistsHref": "http://api.songkick.com/api/3.0/artists/mbid:e21857d5-3256-4547-afb3-4b6ded592596/setlists.json"
  //             }
  //           ], 
  //           "onTourUntil": null, 
  //           "uri": "http://www.songkick.com/artists/68043-gorillaz?utm_source=1976&utm_medium=partner"
  //         }
  //       ]
  //     },
  //     "status": "ok"
  //   }
  // }
  if (!artists_data || !artists_data.resultsPage || !artists_data.resultsPage.results || !artists_data.resultsPage.results.artist) {
    return;
  }
  if (artists_data.resultsPage.results.artist.length == 0) {
    return;
  }
  Spice.render({
    data             : artists_data,
    header1          : 'Artists Similar to ' + ddg_spice_songkick_getartistid.metadata.artist_name + ' (Songkick)',
    source_url       : encodeURI(ddg_spice_songkick_getartistid.metadata.artist_uri),
    source_name      : 'Songkick',
    spice_name       : 'songkick',
    template_frame   : 'list',
    template_options: {
      items         : $.map(artists_data.resultsPage.results.artist.slice(0, max_results), function(o, idx) {
        return {
          uri         : o.uri,
          displayName : o.displayName
        };
      }),
      template_item : 'songkick_artist',
      show          : show_results,
      max           : max_results
    },
    force_big_header : true,
    force_no_fold    : true
  });
}
