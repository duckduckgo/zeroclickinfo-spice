function ddg_spice_lastfm_artist_album(lastfm) {
	console.log(lastfm);
	var out = '';
	if(lastfm.topalbums.album) {
		var tmp, div, div2, link, img, item, limit;
		//Limit the results
		if(lastfm.topalbums.album.length > 5) {
			limit = 5;
		} else {
			limit = lastfm.topalbums.album.length;
		}
		if(lastfm.topalbums.album.length > 0) {
			for (var i = 0;i < limit;i++) {
			    item = lastfm.topalbums.album[i];

			    div = d.createElement("div");
			    div2 = d.createElement("div");

			    link = d.createElement("a");
			    link.href = '/?q=' + item.name + ' album by ' + item.artist.name;
			    
			    var name = item.name;
			    if (item.name.length >= 10) {
					name = item.name.substring(0,8) + "...";
				}

			    img = d.createElement('img');
			    if(item.image) {
			    	img.src = item.image[1]["#text"];
				}
			    YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
			    YAHOO.util.Dom.setStyle(div,'margin-bottom', '10px');
			    YAHOO.util.Dom.setStyle(div,'text-align', 'center');
			    link.appendChild(img);
			    div.appendChild(link);

			    link = d.createElement('a');
			    link.href = '/?q=' + item.name + ' album by ' + item.artist.name;
			    link.innerHTML = name;
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
		} else {
			out = '';
		}
		var items = new Array();
		items[0] = new Array();
		items[0]['a'] = out += '<div style="clear:both;"></div>';
		items[0]['s'] = 'Last.fm';
		items[0]['f'] = 1;
		var query = DDG.get_query();  
		var query = query.replace(/\s*(?:albums?|records?|cds?)\s*(?:by|from|of)\s*/, "");
		if(lastfm.topalbums.album.length > 0) {
			items[0]['h'] = 'Albums from ' + query;
			items[0]['u'] = 'http://www.last.fm/search?q=' + query + '&type=album';
			nra(items,1,1);
		} else {
			items[0]['h'] = lastfm.topalbums.album.name;
			items[0]['i'] = lastfm.topalbums.album.image[1]['#text'];
			items[0]['u'] = lastfm.topalbums.album.url;
			nra(items);
		}
	} else {
		var items = new Array();
		items[0] = new Array();
		var query = DDG.get_query();  
		var query = query.replace(/\s*(?:albums?|records?|cds?)\s*(?:by|from|of)\s*/, "");
		items[0]['a'] = "Sorry, we can't find albums from " + query + 
			'. Try <a href="/?q=' + query + ' albums">' + query + ' albums' +
			'</a> to search for albums featuring the artist. Thanks!'  + '<div style="clear:both;"></div>';
		items[0]['h'] = 'Albums from ' + query;
		items[0]['s'] = 'Last.fm';
		items[0]['f'] = 1;
		items[0]['u'] = 'http://www.last.fm/search?q=' + query + '&type=album';
		nra(items);
	}
}