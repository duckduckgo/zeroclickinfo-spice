function ddg_spice_google_plus(google) {
	console.log(google);
	var out = '';
	if(google.kind === "plus#peopleFeed") {
		var tmp, div, div2, link, img, item, limit;

		//Sometimes, the API returns a lot of results even if we
		//asked for only five. (e.g. coke)
		if(google['items'].length > 5) {
			limit = 5;
		} else {
			limit = google['items'].length;
		}

		for (var i = 0;i < limit;i++) {
		    item = google.items[i];

		    div = d.createElement("div");
		    div2 = d.createElement("div");

		    link = d.createElement("a");
		    link.href = '/?q=g%2B+id+' + item.id;
		    
		 //    if (item.displayName.length >= 10) {
			// 	item.displayName = item.displayName.substring(0,8) + "...";
			// }

		    img = d.createElement('img');
		    img.src = item.image.url;
		    YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
		    YAHOO.util.Dom.setStyle(div,'margin-bottom', '10px');
		    YAHOO.util.Dom.setStyle(div,'text-align', 'center');
		    link.appendChild(img);
		    div.appendChild(link);

		    link = d.createElement('a');
		    link.href = '/?q=g%2B+id+' + item.id;
		    link.innerHTML = item.displayName;
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
		var query = DDG.get_query(); //"google+ this is a test"; 
		var query = query.replace(/\s*(google\+|google\splus|g\+|gplus|\+)\s*/, "");
		items[0]['h'] = 'Google+ Users (' + query + ')';
		items[0]['s'] = 'Google+';
		items[0]['f'] = 1;
		items[0]['u'] = 'http://plus.google.com/s/' + query;
		nra(items,1,1);
	}
}
