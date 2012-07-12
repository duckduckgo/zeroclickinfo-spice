CONST_PIPL_PRIVACY_URL = 'http://pipl.com/privacy_ddg/'


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
			// single profile
			
			//create tagline
			div = d.createElement('div');
			div.appendChild(d.createTextNode(results['profile']['tagline']));
			YAHOO.util.Dom.addClass(div, 'tagline');
			content.appendChild(div);
			
			links = results['profile']['links'];
			ul = createUnorderedList(links, 'results')
			content.appendChild(ul);
			
			// profile image
		    items[0]['i'] = results['profile']['image'];
		} else {
			// suggestions
			links = results['suggestions'];
			ul = createUnorderedList(links, 'suggestions')
			content.appendChild(ul);
		}
		
		// clear everything before the attribution
		div = d.createElement('div');
		YAHOO.util.Dom.addClass(div, 'clear');
		content.appendChild(div);
		
		items[0]['a'] = content;

		nra(items);
		


		//create "is this you? header"
		var spice_header_element = YAHOO.util.Dom.get('zero_click_header');
		if (spice_header_element) {
			
			var is_this_you = d.createElement('a');
			is_this_you.href = CONST_PIPL_PRIVACY_URL;
			is_this_you.appendChild(d.createTextNode('Is this you? click here to learn more about privacy'));
			YAHOO.util.Dom.addClass(is_this_you, 'pipl-privacy-link');
			spice_header_element.appendChild(is_this_you);
		}
				
	}
}

function createUnorderedList(links, ulClass) {
	var ul, li, a, img, d = document;
	ul = d.createElement('ul');
	YAHOO.util.Dom.addClass(ul, ulClass);
	for (var i=0; i<links.length; i++) {
		li = d.createElement('li');
		link = d.createElement('a');
		link.href = links[i]['url'];
		if (!(typeof links[i]['icon'] === "undefined")) {
			if (nur) img = nur('',links[i]['caption'],links[i]['icon']);
			if (img) {
				YAHOO.util.Dom.addClass(img, 'icon');
				link.appendChild(img);
			}
		}
		link.appendChild(d.createTextNode(links[i]['caption']));
		li.appendChild(link);
		ul.appendChild(li);
	}
	return ul;
}
