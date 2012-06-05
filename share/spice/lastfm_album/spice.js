function ddg_spice_lastfm_album(lastfm) {
	console.log(lastfm);
	if(lastfm.album) {	
		var items = new Array();
		items[0] = new Array();
		var summary = '';
		if(lastfm.album.wiki) {
			summary = '<i>Summary: </i>' + lastfm.album.wiki.summary;
		} else {
			summary = '<i>Summary: </i>No summary info available.';
		}
		items[0]['a'] = '<div style="album">' + summary + '</div>' 
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