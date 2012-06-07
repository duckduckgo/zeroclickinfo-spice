function ddg_spice_google_plus_user(google) {
	console.log(google);
	var out = '';
	if(google.kind === "plus#person") {
		//Check if the user has a tagline
		//Tagline or the about me page can be displayed here.
		if (google.tagline) {
			out += '<div class="google_profile"><i>Introduction: </i> ' + google.tagline + '</div>';
		} else if(google.aboutMe) {
			out += '<div class="google_profile"><i>Introduction: </i> ' + google.aboutMe.substring(0, 200) + '...</div>';
		}

		//Check for organizations
		if(google.organizations) {
			var orgs = '';
			for(var i=0;i < google.organizations.length && i < 2;i++) {
				orgs += google.organizations[i].name + 
					(google.organizations[i].title ? ' (' + google.organizations[i].title + ')' : '');
				if(i !== google.organizations.length-1) {
					orgs += ', ';
				}
			}
			out += '<div class="google_orgs"><i>Organizations: </i>' + orgs + '</div>';
		} 
		//Check if the person has links to show.
		if(google.urls) {
			var links = '';
			if(google.urls.length > 2) {
				google.urls.length -= 2;
				for(var i=0;i < google.urls.length && i < 2;i++) {
					links += '<a href="' + google.urls[i].value + '">' + google.urls[i].value
						+ '</a>';
					if(i !== 1) {
						links += ', ';
					}
				}
				out += '<div class="google_links"><i>Links: </i>' + links + '</div>';
			}
		}
		var items = new Array();
		items[0] = new Array();
		items[0]['a'] = out += '<div></div>';
		items[0]['h'] = google.displayName;
		items[0]['s'] = 'Google+';
		items[0]['u'] = google.url;
		items[0]['f'] = 1;
		items[0]['i'] =	google.image.url;
		nra(items);
	}
}
