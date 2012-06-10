function ddg_spice_lastfm_album(lastfm) {
	console.log(lastfm);
	if(lastfm.album) {	
		var items = new Array();
		items[0] = new Array();
		items[1] = new Array();
		var summary = '';
		var songs = '';
		//Summary
		if(lastfm.album.wiki) {
			summary = '<i>Summary: </i>' + lastfm.album.wiki.summary;
		} else {
			summary = '<i>Summary: </i>No summary available.';
		}
		//Tracks
		if(lastfm.album.tracks.track) {
			songs += '<i>Songs: </i>';
			if(lastfm.album.tracks.track.length > 0) {
				for(var i = 0;i < lastfm.album.tracks.track.length;i++) {
					var start = '<a href="/?q=' + lastfm.album.tracks.track[i].name + ' song by '  + lastfm.album.artist + '">';
					songs += start + lastfm.album.tracks.track[i].name + '</a>';
					if(i !== lastfm.album.tracks.track.length-1) {
						songs += ', ';
					}
				}
			} else {
				var start = '<a href="' + lastfm.album.tracks.track.url + '">';
				songs += start + lastfm.album.tracks.track.name + '</a>';
			}
		} else {
			return;
		}
		//Release
		var release = '';
		if(lastfm.album.releasedate != '    ') {
			release = '<br><i>Release date: </i>';
			release += lastfm.album.releasedate.substring(0, lastfm.album.releasedate.length-7);
		}
		//Artist
		var artist = '';
		if(lastfm.album.artist) {
			artist = '<br><i>Artist: </i>';
			artist += '<a href="/?q=' + lastfm.album.artist + '+artist">' + lastfm.album.artist + '</a>';
		}
		items[0]['a'] = '<div style="album">' + summary + release + artist + '</div>' 
					+ '<div style="clear:both;">';
		items[0]['h'] = lastfm.album.name + ' by ' + lastfm.album.artist;
		items[0]['s'] = 'Last.fm';
		items[0]['f'] = 1;
		items[0]['u'] = lastfm.album.url;
		items[0]['i'] = lastfm.album.image[2]["#text"];

		items[1]['h'] = lastfm.album.name + ' by ' + lastfm.album.artist;
		items[1]['t'] = 'Tracks by ' + lastfm.album.artist;
		items[1]['f'] = 1;
		items[1]['a'] = '<div style="songs">' + songs + '</div>';
		items[1]['s'] = 'Last.fm';			
		items[1]['u'] = lastfm.album.url;
		nra(items);
	}
}