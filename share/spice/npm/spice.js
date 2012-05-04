function ddg_spice_npm(query) {
	if (!isEmpty(query)) {
		var latest_version = query["rows"][0]["value"]["dist-tags"]["latest"];
		var package_info = query["rows"][0]["value"]["versions"][latest_version];
		
		var heading = "Package Found: " + query["rows"][0]["key"];
		var content = "";
		
		// Package description
		content += "<div id='npm_package_description'><i>Description: </i>" + package_info.description + "</div>";
		// Package latest version
		content += "<div id='npm_package_version'><i>Latest Version: </i>" + latest_version + "</div>";
		// Package git URL (Maybe make a copy to clipboard function if protocol is git://?)
		content += "<div id='npm_package_git_url'><i>Git URL: </i><a href='" + package_info.repository.url + "'>" + package_info.repository.url + "</a></div>";
		
		// Return items
		items = [[]];
		items[0]['a'] = content;
		items[0]['h'] = heading;
		items[0]['s'] = 'NPM Search';
		items[0]['u'] = 'http://search.npmjs.org/#/' + package_info.name;
		
		nra(items);
	}
}

function isEmpty(obj) {
	for(var prop in obj) {
		if(obj.hasOwnProperty(prop))
			return false;
	}
	return true;
}