
function ddg_spice_pipl(results) {
	if (!results['error']) {
		var items = [[]];
	    items[0]['h'] = results['title'];
	    items[0]['s'] = 'Pipl';
	    items[0]['u'] = results['more_url'];
	    items[0]["force_big_header"] = true;
	    var d = document;
	    var content = d.createElement('span');
	    var div, ul;
	    
	    
		if (!(typeof results['profile'] === "undefined")) {
			div = d.createElement('div');
			div.appendChild(d.createTextNode(results['profile']['tagline']));
			content.appendChild(div);
			
			links = results['profile']['links'];
			ul = createUnorderedList(links, 'results')
			content.appendChild(ul);
			
		    items[0]['i'] = results['profile']['image'];
		} else {
			links = results['suggestions'];
			ul = createUnorderedList(links, 'suggestions')
			content.appendChild(ul);
		}
		items[0]['a'] = content;

		nra(items);
	}
}

function createUnorderedList(links, ulClass) {
	var ul, li, a, img, d = document;
	ul = d.createElement('ul');
	YAHOO.util.Dom.addClass(ul, ulClass);
	for (var i=0; i<links.length; i++) {
		li = d.createElement('li');
		link = d.createElement('a');
		if (!(typeof links[i]['icon'] === "undefined")) {
			if (nur) img = nur('',links[i]['caption'],links[i]['icon']);
			if (img) link.appendChild(img);
		}
		link.appendChild(d.createTextNode(links[i]['caption']));
		li.appendChild(link);
		ul.appendChild(li);
	}
	return ul;
}
