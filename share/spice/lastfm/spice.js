function ddg_spice_lastfm(lastfm) {
	console.log(lastfm);
	//Search for artists
	if(lastfm.results) {
		var query = DDG.get_query();
		query = query.replace(/\s*(albums?)\s*/, "");
		display(lastfm.results.artistmatches.artist, query, "Artists");
	//Get their top albums
	} else if(lastfm.topalbums && lastfm.topalbums.album.length > 0) {
		display(lastfm.topalbums.album, lastfm.topalbums.album[0].artist.name, "Albums");
	//Get album info
	} else if(lastfm.album) {
		var songs = '';
		var out = '';
		out += '<div class="release"><i>Release:</i>' + lastfm.album.releasedate.substring(0,lastfm.album.releasedate.length-7) 
			+ '</div>';
		if(lastfm.album.tracks.track.length > 0) {
			for(var i = 0;i < lastfm.album.tracks.track.length;i++) {
				songs += '<a href="' + lastfm.album.tracks.track[i].url + '">' +
					lastfm.album.tracks.track[i].name + '</a><br>';
			}
		} else {
			songs += '<a href="' + lastfm.album.tracks.track.url + '">' +
					lastfm.album.tracks.track.name + '</a><br>'
		}
		out += '<div class="songs"><i>Songs:</i><br>' + songs + '</div>';
		var items = new Array();
		items[0] = new Array();
		items[0]['a'] = out;
		items[0]['h'] = lastfm.album.name + ' by ' + lastfm.album.artist;
		items[0]['s'] = 'Last.fm';
		items[0]['i'] = lastfm.album.image[2]['#text'];
		items[0]['f'] = 1;
		items[0]['u'] = lastfm.album.url;
		nra(items);		
	}
}

function display(result, query, thing) {
	var tmp, div, div2, link, img, item, limit, out = '', ddg;

	if(thing === 'Albums') {
		ddg = '/?q=albums+album-';
	} else {
		ddg = '/?q=albums+';
	}
	//Get only the ones with the property mbid
	var tmp = new Array();
	for(var i = 0;i < result.length;i++) {
		if(result[i].mbid) {
			tmp.push(result[i]);
		}
	}
	result = tmp;

	//Get only 5 results.
	if(result.length > 5) {
		limit = 5;
	} else {
		limit = result.length;
	}

	for (var i = 0;i < limit;i++) {
		item = result[i];

	    div = d.createElement("div");
	    div2 = d.createElement("div");

	    link = d.createElement("a");
	    link.href = ddg + item.mbid;
	    
	    if (item.name.length >= 10) {
			item.name = item.name.substring(0,8) + "...";
		}

	    img = d.createElement('img');
	    img.src = item.image[1]['#text'];
	    YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
	    YAHOO.util.Dom.setStyle(div,'margin-bottom', '10px');
	    YAHOO.util.Dom.setStyle(div,'text-align', 'center');
	    link.appendChild(img);
	    div.appendChild(link);

	    link = d.createElement('a');
	    link.href = ddg + item.mbid;
	    link.innerHTML = item.name;
	    div.appendChild(link);
	    div.appendChild(d.createElement('br'));
      
	    YAHOO.util.Dom.addClass(div, 'inline highlight_zero_click1 highlight_zero_click_wrapper');
	    YAHOO.util.Dom.setStyle(div, "float", "left");
	    YAHOO.util.Dom.setStyle(div, "margin", "10px 20px 10px 0px");
	    YAHOO.util.Dom.setStyle(div, "padding", "5px");
	    YAHOO.util.Dom.setStyle(div, "max-width", "80px");

	    div2.appendChild(div);

	    out += div2.innerHTML;
	}

	var items = new Array();
	items[0] = new Array();
	items[0]['a'] = out += '<div style="clear:both;"></div>';
	items[0]['h'] = 'Last.fm ' + thing + ' (' + query + ')';
	items[0]['s'] = 'Last.fm';
	items[0]['f'] = 1;
	items[0]['u'] = 'http://www.last.fm/search?q=' + query + '&type=album';
	nra(items,1,1);
}