function ddg_spice_lastfm_artist_tracks(lastfm) {
    console.log(lastfm);
    if(lastfm.toptracks.track) {
        var link, item, limit, toggle=true, tracks = '<div><ul>', duration;
        var artist = '';
        // var query = DDG.get_query();  
        // query = query.replace(/(?:\s*(?:tracks?|songs?|music)\s*(?:by|from|of)?\s*)/, "");

        //Limit the results to five.
        if(lastfm.toptracks.track.length > 5) {
            limit = 5;
        } else {
            limit = lastfm.toptracks.track.length;
        }
        //If there is only one artist.
        if(!lastfm.toptracks.track.length) {
            toggle = false;
            limit = 1;
        }

        //This loop creates a list of songs.
        for (var i = 0;i < limit;i++) {
            if(toggle) {
                item = lastfm.toptracks.track[i];
                artist = lastfm.toptracks.track[i].artist.name;
            } else {
                item = lastfm.toptracks.track;
                artist = lastfm.toptracks.track.artist.name;
            }

            //Get the name of the song.
            var name = item.name;

            //Create the link to the song. Oh, and some links to streaming services.
            link = '<li><a href="/?q=' + encodeURIComponent(name + ' song by ' + item.artist.name) + 
                '">' + name + '</a> by ' + '<a href="/?q=artist ' + encodeURIComponent(item.artist.name) + '">' + item.artist.name + 
                '</a>';
            tracks += link;
        }
        tracks += '</ul></div>\n';
        var items = new Array();
        items[0] = new Array();
        items[0]['a'] = tracks;
        items[0]['h'] = 'Tracks from ' + artist;
        items[0]['s'] = 'Last.fm';
        items[0]['force_no_fold'] = 1;
        items[0]['force_big_header'] = true;
        items[0]['force_space_after'] = true;
        items[0]['u'] = 'http://www.last.fm/search?q=' + encodeURIComponent(artist) + '&type=track';
        nra(items,1,1);
    }
}
