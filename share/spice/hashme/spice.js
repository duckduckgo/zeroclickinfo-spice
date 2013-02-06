function ddg_spice_hashme(hm){
	var snippet;
	if(hm['found'] == 'true'){
		snippet = d.createElement('span');
		div = d.createElement('div');
		snippet.appendChild(div);
		div.innerHTML = 'type: ' + hm['type'];
		ul = d.createElement('ul');
		div.appendChild(ul);
		for(hashCount = 0; hashCount < hm['hashes'].length(); hashCount++){
			li+hashCount = d.createElement(li);
			li+hashCount.innerHTML = hm['hashes'][hashCount];
			ul.appendChild(li+hashCount);
		}
		items = new Array();
		items[0] = new Array();
		items[0]['a'] = snippet;
		items[0]['h'] = hm['info'];
		items[0]['s'] = 'Goog.Li';
		items[0]['u'] = 'https://goog.li?q=' + hm['query'];
		nra(items);
	}
}
