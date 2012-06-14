function ddg_spice_lastfm_top_tracks(lastfm) {
	console.log(lastfm);
	if(lastfm.toptracks.track){
		var songs = '<div style="top">', length = 10, table = '';
		table += '<table>';
		for(var i = 0;i < 10;i++) {
			table += '<tr>';
			table += '<td>' + (i+1) + '.</td>'
			table += '<td width="700">' + '<a href="/?q=' + lastfm.toptracks.track[i].name + ' song by ' + lastfm.toptracks.track[i].artist.name + '">' + 
					lastfm.toptracks.track[i].name + '</a>' + '</td>';
			table += '<td width="100"> by </td>';
			table += '<td width="600">' + '<a href="/?q=' + 'artist ' + lastfm.toptracks.track[i].artist.name + '">' +
					lastfm.toptracks.track[i].artist.name + '</a>' + '</td>';
			table += '</tr>';
		}
		table += '</table>';
		songs += table + '</div>';
		var items = new Array();
		items[0] = new Array();
		items[0]['a'] = songs;
		items[0]['h'] = 'Top 10 Tracks in the ' + lastfm.toptracks["@attr"].country;
		items[0]['s'] = 'Last.fm';
		items[0]['u'] = 'http://www.last.fm/charts/tracks/top';
		items[0]['f'] = 1;
		//items[0]['i'] = 'http://cdn.last.fm/flatness/apple-touch-icon.png';
		nra(items);
	}
}