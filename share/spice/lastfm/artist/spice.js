function ddg_spice_lastfm_artist_all(lastfm) {
    console.log(lastfm);
    if(lastfm.artist) {
        var similar = '<div style="similar"><i>Similar to: </i>';
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
                    'Albums</a> and ';  
        var songs = '<a href="/?q=tracks+from+' + encodeURIComponent(lastfm.artist.name) + '">' +
                    'tracks</a> from ' + lastfm.artist.name + '.';            
        if(lastfm.artist.bio.summary) {
            items[1] = [];
            var summary = lastfm.artist.bio.summary;
            //Remove all the links
            summary = summary.replace(/<.+?>/g, "");
            //Trim
            if(summary.length > 200) {
                summary = '<span id="first" style="display: inline;">' + summary.slice(0, 200) + '...</span> ' + 
                '<a style="display: inline;" id="expand" href="javascript:;" onclick="DDG.toggle(\'ellipsis\', 1); DDG.toggle(\'first\', -1); DDG.toggle(\'expand\', -1);"><span style="color: rgb(119, 119, 119); font-size: 11px; ">Full Description»<span></a>' + 
                '<span id="ellipsis" style="display: none;">' + summary + '</span>';
            }
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
        DDG.toggle("ellipsis", 1);
        nra(items,1,1);
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
        items[0]['f'] = 1;
        items[0]['force_big_header'] = true;
        items[0]['force_space_after'] = true;
        items[0]['u'] = lastfm.artist.url;
        //items[0]['i'] = lastfm.artist.image[2]["#text"];
        nra(items);
    }   
}