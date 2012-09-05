function ddg_spice_lastfm_artist_all(lastfm) {
    console.log(lastfm);
    if(lastfm.artist) {
        var similar = '<div style="similar"><i>Similar: </i>';
        for(var i = 0;i < lastfm.artist.similar.artist.length;i++) {
            var artist = lastfm.artist.similar.artist[i];
            similar += '<a href="/?q=artist+' + encodeURIComponent(artist.name) + '">' + artist.name + '</a>';
            if(i !== lastfm.artist.similar.artist.length-1) {
                similar += ', ';
            }
        }
        similar += '.</div>';        
        var items = [];
        items[0] = [];
        var rest = true;

        var albums = '<a href="/?q=albums+from+' + encodeURIComponent(lastfm.artist.name) + '">' + 
                    'Albums</a> & ';  
        var songs = '<a href="/?q=tracks+from+' + encodeURIComponent(lastfm.artist.name) + '">' +
                    'Tracks</a>';            
        if(lastfm.artist.bio.summary) {
            items[1] = [];
            items[0]['a'] = lastfm.artist.bio.summary + '<div style="clear:both;"></div>';
        } else {
            rest = false;
            items[0]['a'] = similar + '<i>See also:</i> ' + albums + songs + '.<div style="clear:both;"></div>';
        }
        
        items[0]['h'] = lastfm.artist.name;
        items[0]['s'] = 'Last.fm';
        items[0]['force_big_header'] = true;
        items[0]['f'] = 1;
        items[0]['u'] = lastfm.artist.url;

        if(rest) {
            items[1]['a'] = similar + '<i>See also:</i> ' + albums + songs + '.<div style="clear:both;"></div>';
            items[1]['t'] = 'About the band»';
            items[1]['s'] = 'Last.fm';
            items[1]['u'] = lastfm.artist.url;
            items[1]['force_big_header'] = true;
            items[1]['f'] = 1;
        }
        nra(items);
    }
}

function ddg_spice_lastfm_artist_similar(lastfm) {
    console.log(lastfm);
    if(lastfm.artist) {
        var similar = '<div style="similar"><i>Similar: </i>';
        for(var i = 0;i < lastfm.artist.similar.artist.length;i++) {
            var artist = lastfm.artist.similar.artist[i];
            similar += '<a href="/?q=artist+' + encodeURIComponent(artist.name) + '">' + artist.name + '</a>';
            if(i !== lastfm.artist.similar.artist.length-1) {
                similar += ', ';
            }
        }
        similar += '</div>';        
        var items = new Array();
        items[0] = new Array();     
        items[0]['a'] = similar + '<div style="clear:both;"></div>';
        items[0]['h'] = lastfm.artist.name;
        items[0]['s'] = 'Last.fm';
        //items[0]['f'] = 1;
        items[0]['force_big_header'] = true;
        items[0]['u'] = lastfm.artist.url;
        //items[0]['i'] = lastfm.artist.image[2]["#text"];
        nra(items);
    }   
}