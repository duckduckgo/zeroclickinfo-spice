function ddg_spice_lastfm_album_songs(lastfm) {
	console.log(lastfm);
	if(lastfm.album) {
		var song;
		var song_list = '<div style="album"><i>Songs: </i><br>';
		if(lastfm.album.tracks.track.length > 0) {
			for(var i = 0;i < lastfm.album.tracks.track.length;i++) {
				song = lastfm.album.tracks.track[i];
				song_list += '<a href="' + song.url + '">' + song.name + '</a><br>';
			}
		} else {
			song = lastfm.album.tracks.track;
			song_list += '<a href="' + song.url + '">' + song.name + '</a><br>';
		}
		song_list += '</div>';
		var items = new Array();
		items[0] = new Array();
		items[0]['a'] = '<i>Release date: </i>' + 
				lastfm.album.releasedate.substring(0, lastfm.album.releasedate.length-7) + 
				song_list + '<div style="clear:both;"></div>';
		items[0]['h'] = lastfm.album.name + ' by ' + lastfm.album.artist;
		items[0]['s'] = 'Last.fm';
		items[0]['f'] = 1;
		items[0]['u'] = lastfm.album.url;
		items[0]['i'] = lastfm.album.image[1]["#text"];
		nra(items);
	}
}