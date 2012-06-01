function ddg_spice_lastfm_artist(lastfm) {
	console.log(lastfm);
	if(lastfm.artist.mbid) {
		var similar = '<div style="similar"><i>Similar: </i>';
		for(var i = 0;i < lastfm.artist.similar.artist.length;i++) {
			var artist = lastfm.artist.similar.artist[i];
			similar += '<a href="' + artist.url + '">' + artist.name + '</a>';
			if(i !== lastfm.artist.similar.artist.length-1) {
				similar += ', ';
			}
		}
		similar += '</div>';
		var albums = '<a href="/?q=albums+' + lastfm.artist.name + '">' + 
					'Albums by ' + lastfm.artist.name + '</a>';
		var items = new Array();
		items[0] = new Array();
		items[0]['a'] = '<i>Summary: </i>' + lastfm.artist.bio.summary + 
					 similar + albums + '<div style="clear:both;"></div>';
		items[0]['h'] = lastfm.artist.name;
		items[0]['s'] = 'Last.fm';
		items[0]['f'] = 1;
		items[0]['u'] = lastfm.artist.url;
		items[0]['i'] = lastfm.artist.image[1]["#text"];
		nra(items);
	}
}