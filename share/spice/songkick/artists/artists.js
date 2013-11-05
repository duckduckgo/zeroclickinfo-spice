function ddg_spice_songkick_artists(api_result) {
  "use strict";
  var api_key = '';
  var per_page = 5;
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
  console.log(api_result);
  if (!api_result.resultsPage || !api_result.resultsPage.results || !api_result.resultsPage.results.length == 0) {
    return;
  }
  if (api_result.resultsPage.results.artist.size == 0) {
    return;
  }
  var artist_id = api_result.resultsPage.results.artist[0].id;
  console.log('artist_id: ' + artist_id);
  var artist_name = api_result.resultsPage.results.artist[0].displayName;
  console.log('artist_name: ' + artist_name);
  var artist_uri = api_result.resultsPage.results.artist[0].uri;
  console.log('artist_uri: ' + artist_uri);
  var similar_artist_uri = 'http://api.songkick.com/api/3.0/artists/' + artist_id + '/similar_artists.json?per_page=' + per_page + '&apikey=' + api_key;
  console.log('similar_artist_uri: ' + similar_artist_uri);
  $.getJSON(similar_artist_uri, function(artists_data) {
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
    if (!artists_data.resultsPage || !artists_data.resultsPage.results || !artists_data.resultsPage.results.artist) {
      return;
    }
    console.log(artists_data.resultsPage.results.artist);
    Spice.render({
      data             : {
        artists: $(artists_data.resultsPage.results.artist.slice(0, 5)).map(function(idx, o) {
            console.log(o);
            return {
              uri         : o.uri,
              displayName : o.displayName
            };
          })
      },
      header1          : 'Artists Similar to ' + artist_name + ' (Songkick)',
      source_url       : encodeURI(artist_uri),
      source_name      : 'Songkick',
      template_normal  : 'songkick_artists',
      force_big_header : true,
      force_no_fold    : true
    });
  });
}
