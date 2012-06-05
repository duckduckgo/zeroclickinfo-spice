function ddg_spice_lastfm_album(lastfm) {
	console.log(lastfm);
	if(lastfm.album) {	
		var items = new Array();
		items[0] = new Array();
		var summary = '';
		var songs = '';
		if(lastfm.album.wiki) {
			summary = '<i>Summary: </i>' + lastfm.album.wiki.summary;
		} else {
			songs = '<i>Songs: </i>';
			if(lastfm.album.tracks.length > 0) {
				for(var i = 0;i < lastfm.album.tracks.track.length;i++) {
					songs += lastfm.album.tracks.track[i].name;
					if(i !== lastfm.album.tracks.track.length-1) {
						songs += ', ';
					}
				}
			} else {
				songs += lastfm.album.tracks.track.name;
			}
		}
		items[0]['a'] = '<div style="album">' + summary + songs + '</div>' 
					+ '<div style="clear:both;">';
		var songs = '';
		items[0]['h'] = lastfm.album.name + ' by ' + lastfm.album.artist;
		items[0]['s'] = 'Last.fm';
		items[0]['f'] = 1;
		items[0]['u'] = lastfm.album.url;
		items[0]['i'] = lastfm.album.image[2]["#text"];
		nra(items);
	}
}