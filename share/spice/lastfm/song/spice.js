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
			//Remove all the links
            summary = summary.replace(/<.+?>/g, "");
            //Trim
            if(summary.length > 200) {
                summary = '<span id="first" style="display: inline;">' + summary.slice(0, 200) + '</span> ' + 
                '<a style="display: inline;" id="expand" href="javascript:;" onclick="DDG.toggle(\'ellipsis\', 1); DDG.toggle(\'first\', -1); DDG.toggle(\'expand\', -1);"><span style="color: rgb(119, 119, 119); font-size: 11px; ">Full Description»<span></a>' + 
                '<span id="ellipsis" style="display: none;">' + summary + '</span>';
            }
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
		var listen = '<i>Listen:</i> ' + tinysong + ' or ' + rdio + '<br>';
		
		if(rest) {
			items[0]['a'] = '<div style="song">' + summary + '</div>' + 
			'<div>' + album + artist + listen + '</div>';
		} else {
			items[0]['a'] = '<div>' + album + artist + listen + '</div>';
		}
		items[0]['s'] = 'Last.fm';
		items[0]['f'] = 1;
		var query = DDG.get_query();
		items[0]['h'] = query;
		items[0]['force_big_header'] = true;
		items[0]['force_space_after'] = true;
		items[0]['u'] = lastfm.track.url;
		nra(items,1,1);
	}
}