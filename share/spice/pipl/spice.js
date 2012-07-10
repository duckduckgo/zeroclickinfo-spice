function ddg_spice_pipl(results) {
	if (!results['error']) {
		var items = [[]];
	    items[0]['h'] = results['title'];
	    items[0]['s'] = 'Pipl';
	    items[0]['u'] = results['more_url'];
	    items[0]["force_big_header"] = true;
	    var content = "";
	    
		if (!(typeof results['profile'] === "undefined")) {
			content += "<div>" + results['profile']['tagline'] + "</div>";
			links = results['profile']['links'];
			content += "<ul>";
			for (var i=0; i<links.length; i++)
				content += '<li><a href="' + links[i]['url'] + '">' + links[i]['caption'] +'</a></li>';
			
			content += "</ul>";
		    
		    items[0]['i'] = results['profile']['image'];
		} else {
			links = results['suggestions'];
			content += "<ul>";
			for (var i=0; i<links.length; i++)
				content += '<li><a href=http://www.pipl.com/search/"' + links[i]['url'] + '">' + links[i]['caption'] +'</a></li>';
			
			content += "</ul>";
		}
		items[0]['a'] = content;

		nra(items);
	}
}
