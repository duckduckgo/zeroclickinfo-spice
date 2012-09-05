function ddg_spice_lastfm_album(lastfm) {
	console.log(lastfm);
	if(lastfm.album) {	
		var items = [];
		items[0] = [];
		var summary = '';
		var songs = '';
		var rest = true;
		//Summary
		if(lastfm.album.wiki) {
			items[1] = [];
			summary = lastfm.album.wiki.summary;
			//Remove all the links
            summary = summary.replace(/<.+?>/g, "");
            //Trim
            if(summary.length > 200) {
                summary = summary.slice(0, 200) + '<a href="' + lastfm.album.url + '">...</a>';
            }
		} else {
			rest = false;
		}
		//Tracks
		if(lastfm.album.tracks.track) {
			songs += '<i>Songs: </i>';
			if(lastfm.album.tracks.track.length > 0) {
				for(var i = 0;i < lastfm.album.tracks.track.length;i++) {
					var start = '<a href="/?q=' + encodeURIComponent(lastfm.album.tracks.track[i].name + ' song by '  + lastfm.album.artist) + '">';
					songs += start + lastfm.album.tracks.track[i].name + '</a>';
					if(i !== lastfm.album.tracks.track.length-1) {
						songs += ', ';
					}
				}
			} else {
				var start = '<a href="/?q=' + encodeURIComponent(lastfm.album.tracks.track.name + ' song by ' +  lastfm.album.artist) + '">';
				songs += start + lastfm.album.tracks.track.name + '</a>';
			}
		} else {
			return;
		}
		//Release
		var release = '';
		if(lastfm.album.releasedate != '    ') {
			release = '<i>Release date: </i>';
			release += lastfm.album.releasedate.substring(0, lastfm.album.releasedate.length-7);
			release += '<br>';
		}
		//Artist
		var artist = '';
		if(lastfm.album.artist) {
			artist = '<i>Artist: </i>';
			artist += '<a href="/?q=' + encodeURIComponent(lastfm.album.artist) + '+artist">' + lastfm.album.artist + '</a>';
		}
		if(rest) {
			items[0]['a'] = '<div style="songs">' + summary + '</div>' + '<div style="album">' + release + artist + '</div>' + songs;
						+ '<div style="clear:both;">';
		} else {
			items[0]['a'] = '<div style="album">' + release + artist + '</div>' + songs;
						+ '<div style="clear:both;">';
		}
		items[0]['h'] = lastfm.album.name + ' by ' + lastfm.album.artist;
		items[0]['s'] = 'Last.fm';
		items[0]['f'] = 1;
		items[0]['force_big_header'] = true;
		items[0]['u'] = lastfm.album.url;
		items[0]['f'] = 1;
		nra(items);
	}
}