function ddg_spice_lastfm_song(lastfm) {
	console.log(lastfm);
	if(lastfm.track) {	
		var items = new Array();
		items[0] = new Array();
		var album = '';
		if(lastfm.track.album) {
			album = '<div style="album"><i>Album: </i><a href="/?q=' + lastfm.track.album.title + 
				' album by ' + lastfm.track.artist.name + '">' + lastfm.track.album.title + '</a></div>';
		} else {
			album = '<div style="album"><i>Album: </i>No album info available.</div>';
		}
		var summary = '';
		if(lastfm.track.wiki) {
			summary = '<i>Summary: </i>' + lastfm.track.wiki.summary;
		} else {
			summary = '<i>Summary: </i> No summary info available.';
		}
		var artist = '<div style="artist"><i>Artist: </i><a href="' +
				' artist ' + lastfm.track.artist.name + '">' + lastfm.track.artist.name + '</a></div>';
		//Listen
		//var pandora = '<a href="/?q=!pandora ' + lastfm.track.artist.name + '">Pandora</a>';
		var rdio = '<a href="/?q=!rdio ' + lastfm.track.artist.name + ' ' + lastfm.track.name + '">Rdio</a>';
		var tinysong = '<a href="http://tinysong.com/#/result/' + lastfm.track.artist.name + ' ' + lastfm.track.name + '">Grooveshark</a>';

		//More
		//var amazon = '<a href="/?q=!amazon ' + lastfm.track.artist.name + ' ' + lastfm.track.name + '">Amazon</a>';
		var lyrics = '<a href="/?q=' + lastfm.track.artist.name + ' ' + lastfm.track.name + ' lyrics">Lyrics</a>';
		
		//Combine
		var listen = tinysong + ' | ' + rdio + ' | ';
		var more = lyrics + ' | ';
		
		items[0]['a'] = '<div style="song">' + summary + '</div>' + album + artist + '<div style="clear:both;"></div>'
			+ listen + more;
		items[0]['s'] = 'Last.fm';
		items[0]['f'] = 1;
		items[0]['u'] = lastfm.track.url;
		if(lastfm.track.album) {
			items[0]['i'] = lastfm.track.album.image[2]["#text"];
		}
		nra(items);
	}
}