function ddg_spice_google_plus(google) {
	console.log(google);
	var out, tmp, div, div2, link, img, item;
	out = '';
	if(google['items'].length > 0) {
		//Sometimes, the API returns a lot of results even if we
		//asked for only five. (e.g. coke)
		if(google['items'].length > 5) {
			google['items'].length = 5;
		}

		for (var i = 0;i < google['items'].length;i++) {
		    item = google.items[i];

		    div = d.createElement("div");
		    div2 = d.createElement("div");

		    link = d.createElement("a");
		    link.href = item.url;
		    
		    if (item.displayName.length >= 10) {
				item.displayName = item.displayName.substring(0,8) + "...";
			}

		    img = d.createElement('img');
		    img.src = item.image.url;
		    YAHOO.util.Dom.setStyle(img, "margin", '0 auto 0 auto');
		    YAHOO.util.Dom.setStyle(div,'margin-bottom', '10px');
		    YAHOO.util.Dom.setStyle(div,'text-align', 'center');
		    link.appendChild(img);
		    div.appendChild(link);

		    link = d.createElement('a');
		    link.href = item.url;
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

		items = new Array();
		items[0] = new Array();
		items[0]['a'] = out;
		items[0]['h'] = '';
		items[0]['s'] = 'Google+';
		items[0]['u'] = 'http://plus.google.com';
		items[0]['f'] = 1;
		//items[0]['i'] = 'http://upload.wikimedia.org/wikipedia/commons/9/95/Google%2B_logo.png';
		nra(items);
	}
}