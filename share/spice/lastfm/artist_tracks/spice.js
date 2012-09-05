function ddg_spice_lastfm_artist_tracks(lastfm) {
    console.log(lastfm);
    if(lastfm.toptracks.track) {
        var link, item, limit, toggle=true, tracks = '<div><ul>', duration;

        var query = DDG.get_query();  
        query = query.replace(/(?:\s*(?:tracks?|songs?|music)\s*(?:by|from|of)?\s*)/, "");

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

            duration = lastfm.toptracks.track[i].duration;
            var min = 0;
            var sec = 0;
            if(duration) {
                duration = Number(duration);
                if(duration >= 60) {
                    min = Math.floor(duration / 60);
                    sec = duration - (min * 60);
                } else {
                    sec = String(duration);
                }
                min = ' ' + min + 'min. ';
                sec += 'sec.';
            } else {
                min = '';
                sec = '';
            }

            //Create the link to the song. Oh, and some links to streaming services.
            link = '<li><a href="/?q=' + encodeURIComponent(name + ' song by ' + item.artist.name) + 
                '">' + name + '</a> by ' + '<a href="/?q=artist ' + encodeURIComponent(item.artist.name) + '">' + item.artist.name + 
                '</a><span style="color: rgb(119, 119, 119); font-size: 11px; "> ' + min + sec + '</span>';                
                /*'</a> <span style="color: rgb(119, 119, 119);">​(Listen on ';
            link += '<a href="' + 'http:\/\/tinysong.com\/#\/result\/' + encodeURIComponent(name) + ' ' + item.artist.name + '">' + 'Grooveshark' + '</a> or ';
            link += '<a href="' + '/?q=' + encodeURIComponent('!rdio ' +  name + ' by ' + item.artist.name) + '">' + 'Rdio' + '</a>)</span></li>';*/
            tracks += link;
        }
        tracks += '</ul></div>\n';
        var items = new Array();
        items[0] = new Array();
        items[0]['a'] = tracks;
        items[0]['h'] = 'Tracks from ' + query;
        items[0]['s'] = 'Last.fm';
        items[0]['f'] = 1;
        items[0]['force_big_header'] = true;
        items[0]['u'] = 'http://www.last.fm/search?q=' + encodeURIComponent(query) + '&type=track';
        nra(items,1,1);
    }
}