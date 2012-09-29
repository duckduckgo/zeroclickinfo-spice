function ddg_spice_lastfm_album(lastfm) {
	// console.log(lastfm);
	if(lastfm.album) {	
		var items = [];
		items[0] = [];
		var summary = '';
		var songs = '';
		var rest = true;
		var length = lastfm.album.tracks.track.length;
		if(length > 5) {
			length = 5
		}
		//Summary
		if(lastfm.album.wiki) {
			items[1] = [];
			summary = lastfm.album.wiki.summary;
			//Remove all the links
            summary = summary.replace(/<.+?>/g, "");
            //Trim
            if(summary.length > 200) {
                summary = '<span id="first" style="display: inline;">' + '<i>Description:</i> ' + summary.slice(0, 200) + '</span> ' + 
                '<a style="display: inline;" id="expand" href="javascript:;" onclick="DDG.toggle(\'ellipsis\', 1); DDG.toggle(\'first\', -1); DDG.toggle(\'expand\', -1);"><span style="color: rgb(119, 119, 119); font-size: 11px; ">More...<span></a>' + 
                '<span id="ellipsis" style="display: none;">' + '<i>Description:</i> ' + summary + '</span>';
            } else {
            	summary = '<i>Description:</i> ' + summary;
            }
		} else {
			rest = false;
		}

		//Listen
		var artist_album = encodeURIComponent(lastfm.album.name + ' ' + lastfm.album.artist);
		var rdio = '<a href="/?q=!rdio ' + artist_album + '">Rdio</a>';
		var tinysong = '<a href="/?q=!grooveshark ' + artist_album + '">Grooveshark</a>';
		var spotify = '<a href="spotify:search:album:' + artist_album + '">Spotify</a>';
		var amazon = '<a href="/?q=!amazonmp3 ' + artist_album + '">Amazon MP3</a>';
		//var listen = '<i>Listen:</i> ' + spotify + ', ' + rdio + ', ' + tinysong + ', or ' + amazon + '<br>';

		//Tracks
		if(lastfm.album.tracks.track) {
			songs += '<i>Songs: </i>';
			if(lastfm.album.tracks.track.length > 0) {
				for(var i = 0;i < length;i++) {
					var start = '<a href="/?q=' + encodeURIComponent(lastfm.album.tracks.track[i].name + ' song by '  + lastfm.album.artist) + '">';
					songs += start + lastfm.album.tracks.track[i].name + '</a>';
					if(i !== length-1) {
						songs += ', ';
					} else {
						songs += '.';
					}
				}
			} else {
				var start = '<a href="/?q=' + encodeURIComponent(lastfm.album.tracks.track.name + ' song by ' +  lastfm.album.artist) + '">';
				songs += start + lastfm.album.tracks.track.name + '</a>';
			}
		} else {
			return;
		}
		//Release
		var release = '';
		if(lastfm.album.releasedate != '    ') {
			release = '<i>Release date: </i>';
			release += lastfm.album.releasedate.substring(0, lastfm.album.releasedate.length-7);
			release += '<br>';
		}
		//Artist
		var artist = '';
		if(lastfm.album.artist) {
			artist = '<i>Artist: </i>';
			artist += '<a href="/?q=' + encodeURIComponent(lastfm.album.artist) + '+artist">' + lastfm.album.artist + '</a>' + '<br>';
		}
		if(rest) {
			items[0]['a'] = '<div>' + artist + release + '</div>' + songs + '<div style="clear:both;">' + summary;
						+ '<div style="clear:both;">';
		} else {
			items[0]['a'] = '<div>' + artist + release + '<div style="clear:both;">' + songs + '</div>'
						+ '<div style="clear:both;">';
		}
		items[0]['h'] = lastfm.album.name + ' (Album)';
		items[0]['s'] = 'Last.fm';
		items[0]['f'] = 1;
		items[0]['force_big_header'] = true;
		items[0]['force_space_after'] = true;
		items[0]['u'] = lastfm.album.url;
		items[0]['f'] = 1;
		nra(items,1,1);
	}
}