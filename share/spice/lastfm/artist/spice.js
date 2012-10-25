function ddg_spice_lastfm_artist_all(lastfm) {
    if(lastfm.artist && lastfm.artist.similar.artist) {
        similar = '<div style="similar"><i>Similar to: </i>';
        for(var i = 0;i < lastfm.artist.similar.artist.length;i++) {
            var artist = lastfm.artist.similar.artist[i];
            similar += '<a href="/?q=artist+' + encodeURIComponent(artist.name) + '">' + artist.name + '</a>';
            if(i !== lastfm.artist.similar.artist.length-1) {
                similar += ', ';
            }
        }
        similar += '.</div>';
        var items = [[]];
        var rest = true;

        var albums = '<a href="/?q=albums+from+' + encodeURIComponent(lastfm.artist.name) + '">' + 
                    'albums</a> and ';  
        var songs = '<a href="/?q=tracks+from+' + encodeURIComponent(lastfm.artist.name) + '">' +
                    'tracks</a> from ' + lastfm.artist.name + '.';            
        if(lastfm.artist.bio.summary) {
            items[1] = [];
            var summary = _.str.stripTags(lastfm.artist.bio.summary);
            summary = Coral.extractSentence(summary, 1, Coral.moreHTML);
            items[0]['a'] = summary + '<div style="clear:both;"></div>' + similar + '<i>See also:</i> ' + 
            albums + songs + '<div style="clear:both;"></div>';
        } else {
            rest = false;
            items[0]['a'] = similar + '<i>See also:</i> ' + albums + songs + '<div style="clear:both;"></div>';
        }
        
        items[0]['h'] = lastfm.artist.name;
        items[0]['s'] = 'Last.fm';
        items[0]['force_big_header'] = true;
        items[0]['force_space_after'] = true;
        items[0]['f'] = 1;
        items[0]['u'] = lastfm.artist.url;
        nra(items,1,1);
    }
}

function ddg_spice_lastfm_artist_similar(lastfm) {
    // console.log(lastfm);
    if(lastfm.artist && lastfm.artist.similar.artist) {
        var similar = '<div style="similar">';
        for(var i = 0;i < lastfm.artist.similar.artist.length;i++) {
            var artist = lastfm.artist.similar.artist[i];
            similar += '<a href="/?q=artist+' + encodeURIComponent(artist.name) + '">' + artist.name + '</a>';
            if(i !== lastfm.artist.similar.artist.length-1) {
                if(i === lastfm.artist.similar.artist.length - 2) {
                    similar += ', and '
                } else {
                    similar += ', ';
                }
            }
        }
        
        if(lastfm.artist.similar.artist.length > 1) {
            similar += ' are similar to <a href="/?q=artist ' + lastfm.artist.name + '">' + lastfm.artist.name + '</a>.';
        } else {
            similar += ' is similar to <a href="/?q=artist ' + lastfm.artist.name + '">' + lastfm.artist.name + '</a>.';
        }

        similar += '</div>';        
        var items = new Array();
        items[0] = new Array();     
        items[0]['a'] = similar + '<div style="clear:both;"></div>';
        items[0]['h'] = 'Similar to ' + lastfm.artist.name + ' (Artist)';
        items[0]['s'] = 'Last.fm';
        items[0]['f'] = 1;
        items[0]['force_big_header'] = true;
        items[0]['force_space_after'] = true;
        items[0]['u'] = lastfm.artist.url;
        //items[0]['i'] = lastfm.artist.image[2]["#text"];
        nra(items, 1, 1);
    }   
}
