function ddg_spice_lastfm_artist_album(lastfm) {
    console.log(lastfm);
    if(lastfm.topalbums.album) {
        var link, item, limit, toggle = true, albums = '<div style="albums"><ul>';

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
            } else {
                item = lastfm.topalbums.album;
            }

            //Name of the album
            var name = item.name;

            //Create the link to the song. Oh, and some links to streaming services.
            link = '<li><a href="/?q=' + encodeURIComponent(name + ' album by ' + item.artist.name) + 
                '">' + name + '</a> by ' + '<a href="/?q=artist ' + encodeURIComponent(item.artist.name) + '">' + item.artist.name + '</a>';

                /*'</a>  <span style="color: rgb(119, 119, 119);">​(Listen on ';
            link += '<a href="' + 'http:\/\/tinysong.com\/#\/result\/' + encodeURIComponent(name) + ' ' + item.artist.name + '">' + 'Grooveshark' + '</a> or ';
            link += '<a href="' + '/?q=' + encodeURIComponent('!rdio ' +  name + ' by ' + item.artist.name) + '">' + 'Rdio' + '</a>)</span></li>';*/

            albums += link;
        }
        albums += '</div>';

        var items = new Array();
        items[0] = new Array();
        items[0]['a'] = albums;
        items[0]['s'] = 'Last.fm';
        items[0]['f'] = 1;
        var query = DDG.get_query();  
        query = query.replace(/\s*(?:albums?|records?|cds?)\s*(?:by|from|of)?\s*/, "");
        items[0]['h'] = 'Albums from ' + query;
        items[0]['u'] = 'http://www.last.fm/search?q=' + query + '&type=album';
        items[0]['force_big_header'] = true;
        items[0]['force_space_after'] = true;
        nra(items,1,1);
    }
}