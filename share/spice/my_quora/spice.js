function ddg_spice_my_quora(response) {
	var snippet = ' ';
	sanitize_response = response.substring(9);
	//console.log(response)
	if(sanitize_response) {
		
		var jobj = sanitize_response;//.evalJSON(true)
		if (jobj)
		{
			snippet = jobj;//.name;
			items = new Array();
			items[0] = new Array();
			items[0]['a'] = ' ';
			items[0]['s'] = snippet;
			items[0]['u'] = 'www.quora.com';
			nra(items);
		}
}
}
