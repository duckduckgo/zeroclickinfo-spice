function ddg_spice_lastfm_artist_tracks(lastfm) {
    console.log(lastfm);
    if(lastfm.toptracks.track) {
        var link, item, limit, toggle=true, tracks = '<div style="albums"><ul>';

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
            } else {
                item = lastfm.toptracks.track;
            }

            //Get the name of the song.
            var name = item.name;

            //Create the link to the song. Oh, and some links to streaming services.
            link = '<li><a href="/?q=' + encodeURIComponent(name + ' song by ' + item.artist.name) + 
                '">' + name + '</a> (Listen on ';
            link += '<a href="' + 'http:\/\/tinysong.com\/#\/result\/' + encodeURIComponent(name) + '">' + 'Grooveshark' + '</a> or ';
            link += '<a href="' + '/?q=' + encodeURIComponent('!rdio ' +  name) + '">' + 'Rdio' + '</a>)';
            tracks += link;
        }
        tracks += '</ul></div>';
        var items = new Array();
        items[0] = new Array();
        items[0]['a'] = tracks += '<div style="clear:both;"></div>';
        var query = DDG.get_query();  
        var query = query.replace(/(?:\s*(?:tracks?|songs?|music)\s*(?:by|from|of)?\s*)/, "");
        items[0]['h'] = 'Tracks from ' + query;
        items[0]['s'] = 'Last.fm';
        items[0]['f'] = 1;
        items[0]['force_big_header'] = true;
        items[0]['u'] = 'http://www.last.fm/search?q=' + query + '&type=track';
        nra(items,1,1);
    }
}