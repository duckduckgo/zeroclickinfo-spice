function ddg_spice_lastfm_artist_album(lastfm) {
    console.log(lastfm);
    if(lastfm.topalbums.album) {
        var link, item, limit, toggle = true, albums = '<div style="movies">';

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
            // if (item.name.length >= 20) {
            //     name = item.name.substring(0,20) + "...";
            // }

            //Make the link
            link = '<a href="/?q=' + encodeURIComponent(item.name + ' album by ' + item.artist.name) + 
                    '">' + name + '</a>';
            if(i < limit-1) {
                link += ", ";
            }
            albums += link;
        }
        albums += '</div>';

        var items = new Array();
        items[0] = new Array();
        items[0]['a'] = albums += '<div style="clear:both;"></div>';
        items[0]['s'] = 'Last.fm';
        items[0]['f'] = 1;
        var query = DDG.get_query();  
        var query = query.replace(/\s*(?:albums?|records?|cds?)\s*(?:by|from|of)?\s*/, "");
        items[0]['h'] = 'Albums from ' + query;
        items[0]['u'] = 'http://www.last.fm/search?q=' + query + '&type=album';
        items[0]['force_big_header'] = true;
        nra(items,1,1);
    }
}