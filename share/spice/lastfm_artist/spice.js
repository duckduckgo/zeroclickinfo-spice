function ddg_spice_lastfm_artist_all(lastfm) {
	console.log(lastfm);
	if(lastfm.artist) {
		var similar = '<div style="similar"><i>Similar: </i>';
		for(var i = 0;i < lastfm.artist.similar.artist.length;i++) {
			var artist = lastfm.artist.similar.artist[i];
			similar += '<a href="/?q=artist+' + artist.name + '">' + artist.name + '</a>';
			if(i !== lastfm.artist.similar.artist.length-1) {
				similar += ', ';
			}
		}
		similar += '</div>';		
		var items = new Array();
		items[0] = new Array();
		var albums = '<a href="/?q=albums+from+' + lastfm.artist.name + '">' + 
					'Albums</a> | ';  
		var songs = '<a href="/?q=tracks+from+' + lastfm.artist.name + '">' +
					'Tracks</a> | ';			
		items[0]['a'] = '<i>Summary: </i>' + lastfm.artist.bio.summary + 
					 similar + albums + songs; //+ '<div style="clear:both;"></div>';
		items[0]['h'] = lastfm.artist.name;
		items[0]['s'] = 'Last.fm';
		items[0]['f'] = 1;
		items[0]['u'] = lastfm.artist.url;
		//items[0]['i'] = lastfm.artist.image[2]["#text"];
		nra(items);
	}
}

function ddg_spice_lastfm_artist_similar(lastfm) {
	console.log(lastfm);
	if(lastfm.artist) {
		var similar = '<div style="similar"><i>Similar: </i>';
		for(var i = 0;i < lastfm.artist.similar.artist.length;i++) {
			var artist = lastfm.artist.similar.artist[i];
			similar += '<a href="/?q=artist+' + artist.name + '">' + artist.name + '</a>';
			if(i !== lastfm.artist.similar.artist.length-1) {
				similar += ', ';
			}
		}
		similar += '</div>';		
		var items = new Array();
		items[0] = new Array();		
		items[0]['a'] = similar + '<div style="clear:both;"></div>';
		items[0]['h'] = lastfm.artist.name;
		items[0]['s'] = 'Last.fm';
		items[0]['f'] = 1;
		items[0]['u'] = lastfm.artist.url;
		items[0]['i'] = lastfm.artist.image[2]["#text"];
		nra(items);
	}	
}