function ddg_spice_lastfm_song(lastfm) {
	console.log(lastfm);
	if(lastfm.track) {	
		var items = [];
		items[0] = [];
		var rest = true;
		var album = '';
		if(lastfm.track.album) {
			album = '<div style="album"><i>Album: </i><a href="/?q=' + encodeURIComponent(lastfm.track.album.title + 
				' album by ' + lastfm.track.artist.name) + '">' + lastfm.track.album.title + '</a></div>';
		} else {
			album = "No album information available.";
		}

		var summary = '';
		if(lastfm.track.wiki) {
			items[1] = [];
			summary = lastfm.track.wiki.summary;
		} else {
			rest = false;
		}
		var artist = '<div style="artist"><i>Artist: </i><a href="/?q=' +
				' artist ' + encodeURIComponent(lastfm.track.artist.name) + '">' + lastfm.track.artist.name + '</a></div>';
		//Listen
		//var pandora = '<a href="/?q=!pandora ' + lastfm.track.artist.name + '">Pandora</a>';
		var rdio = '<a href="/?q=!rdio ' + encodeURIComponent(lastfm.track.artist.name + ' ' + lastfm.track.name) + '">Rdio</a>';
		var tinysong = '<a href="http://tinysong.com/#/result/' + encodeURIComponent(lastfm.track.artist.name + ' ' + lastfm.track.name) + '">Grooveshark</a>';

		//More
		//var amazon = '<a href="/?q=!amazon ' + lastfm.track.artist.name + ' ' + lastfm.track.name + '">Amazon</a>';
		var lyrics = '<a href="/?q=' + encodeURIComponent(lastfm.track.artist.name + ' ' + lastfm.track.name) + ' lyrics">Lyrics</a>';
		
		//Combine
		var listen = '<i>Listen:</i> ' + tinysong + ' or ' + rdio + '<br>';
		var more = '<i>Lyrics:</i> ' + lyrics;
		
		if(rest) {
			items[0]['a'] = '<div style="song">' + summary + '</div>';
		} else {
			items[0]['a'] = '<div>' + album + artist + listen + more + '</div>';
		}
		items[0]['s'] = 'Last.fm';
		//items[0]['f'] = 1;
		var query = DDG.get_query();
		items[0]['h'] = query;
		items[0]['force_big_header'] = true;
		items[0]['u'] = lastfm.track.url;

		if(rest) {
			items[1]['t'] = 'About the song»';
			//items[1]['f'] = 1;
			items[1]['a'] = '<div>' + album + artist + listen + more + '</div>';
			items[1]['s'] = 'Last.fm';			
			items[1]['force_big_header'] = true;
			items[1]['u'] = lastfm.track.url;
		}

		nra(items);
	}
}