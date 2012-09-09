function ddg_spice_lastfm_artist_album(lastfm) {
    console.log(lastfm);
    if(lastfm.topalbums.album) {
        var link, item, limit, toggle = true, albums = '<div style="albums"><ul>';
        var album = '';

        //Limit the results
        if(lastfm.topalbums.album.length > 5) {
            limit = 5;
        } else {
            limit = lastfm.topalbums.album.length;
        }
        //If there is only one album.
        if(!lastfm.topalbums.album.length) {
            toggle = false;
            limit = 1;
        }

        for (var i = 0;i < limit;i++) {
            if(toggle) {
                item = lastfm.topalbums.album[i];
                album = lastfm.topalbums.album[i].artist.name;
            } else {
                item = lastfm.topalbums.album;
                album = lastfm.topalbums.album.artist.name;
            }

            //Name of the album
            var name = item.name;

            //Create the link to the song. Oh, and some links to streaming services.
            link = '<li><a href="/?q=' + encodeURIComponent(name + ' album by ' + item.artist.name) + 
                '">' + name + '</a> by ' + '<a href="/?q=artist ' + encodeURIComponent(item.artist.name) + '">' + item.artist.name + '</a>';

            albums += link;
        }
        albums += '</div>';

        var items = new Array();
        items[0] = new Array();
        items[0]['a'] = albums;
        items[0]['s'] = 'Last.fm';
        items[0]['f'] = 1;
        // var query = DDG.get_query();  
        // query = query.replace(/\s*(?:albums?|records?|cds?)\s*(?:by|from|of)?\s*/, "");
        items[0]['h'] = 'Albums from ' + album;
        items[0]['u'] = 'http://www.last.fm/search?q=' + album + '&type=album';
        items[0]['force_big_header'] = true;
        items[0]['force_space_after'] = true;
        nra(items,1,1);
    }
}