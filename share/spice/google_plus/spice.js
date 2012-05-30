function ddg_spice_google_plus(google) {
	console.log(google);

	var out = '';
	if(google.kind === "plus#peopleFeed") {
		var tmp, div, div2, link, img, item;

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
		    link.href = '/?q=google%2B+' + item.id;
		    
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
		    link.href = '/?q=google%2B+' + item.id;
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
		items[0]['a'] = out;
		items[0]['h'] = '';
		items[0]['s'] = 'Google+';
		items[0]['f'] = 1;
		items[0]['u'] = 'http://plus.google.com';
		nra(items,1,1);
	} else if(google.kind === "plus#person") {
		//Check if the user has a tagline
		//Tagline or the about me page can be displayed here.
		if (google.aboutMe) {
			out += '<div class="google_profile"><i>Introduction:</i> ' + google.aboutMe + '</div>';
		}

		//Check for organizations
		if(google.organizations) {
			var orgs = '';
			for(var i=0;i < google.organizations.length && i < 2;i++) {
				orgs += google.organizations[i].name + 
					(google.organizations[i].title ? ', ' + google.organizations[i].title : '') 
					+ '<br>';
			}
			out += '<div class="google_orgs"><i>Organizations:</i><br>' + orgs + '</div>';
		} 
		//Check if the person has links to show.
		if(google.urls) {
			var links = '';
			if(google.urls.length > 2) {
				google.urls.length -= 2;
				for(var i=0;i < google.urls.length && i < 2;i++) {
					links += '<a href="' + google.urls[i].value + '">' + google.urls[i].value + 
						'</a><br>';
				}
				out += '<div class="google_links"><i>Links:</i><br>' + links + '</div>';
			}
		}
		var items = new Array();
		items[0] = new Array();
		items[0]['a'] = out += '<div></div>';
		items[0]['h'] = google.displayName;
		items[0]['s'] = google.displayName;
		items[0]['u'] = google.url;
		items[0]['f'] = 1;
		items[0]['i'] =	google.image.url;
		nra(items);
	}
}
