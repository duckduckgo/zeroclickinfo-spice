function ddg_spice_hash_me(hm){
	var snippet;
	var items;
	items = new Array();
	items[0] = new Array();
	if(hm['found'] == 'true'){
		snippet = d.createElement('span');
		div = d.createElement('div');
		snippet.appendChild(div);
		ul = d.createElement('ul');
		div.appendChild(ul);
		hashLength = 0;
		for(key in hm['hashes'][0]) {
			if(key != hm['type']){
				li = d.createElement('li');
				li.innerHTML = key + ' - ' + hm['hashes'][0][key];
				ul.appendChild(li);
			}
		}

		items[0]['a'] = snippet;
		items[0]['h'] = '<h1>' + capitalOne(hm['type']) + ': ' + hm['query'] + '</h1>';
		items[0]['s'] = 'goog.li';
		items[0]['u'] = 'https://goog.li?q=' + hm['query'];
		nra(items);
	}
	else{
		snippet = d.createElement('span');
		div = d.createElement('div');
		snippet.appendChild(div);
		div.innerHTML = capitalOne(hm['msg']);
		items[0]['a'] = snippet;
		items[0]['h'] = '<h1>' + capitalOne(hm['type']) + ': ' + hm['query'] + '</h1>';
		items[0]['s'] = 'goog.li';
		items[0]['u'] = 'https://goog.li?q=' + hm['query'];
		nra(items);
	}
}
function capitalOne(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
