function ddg_spice_lastfm_top_tracks(lastfm) {
	if(lastfm.tracks.track){
		var songs = '<div style="top">';
		for(var i = 0;i < lastfm.tracks.track.length;i++) {
			songs += '<a href="/?q=' + lastfm.tracks.track[i].name + ' song by ' + lastfm.tracks.track[i].artist.name + '">' + 
					lastfm.tracks.track[i].name + '</a>' + ' by ' + 
					lastfm.tracks.track[i].artist.name + '<br>';
		}
		songs += '</div>';
		var items = new Array();
		items[0] = new Array();
		items[0]['a'] = songs;
		items[0]['h'] = 'Top 10 Tracks on Last.fm';
		items[0]['s'] = 'Last.fm';
		items[0]['u'] = 'http://www.last.fm/charts/tracks/top';
		items[0]['f'] = 1;
		//items[0]['i'] = '';
		nra(items);
	}
}