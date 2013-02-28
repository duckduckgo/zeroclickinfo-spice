function ddg_spice_meta_cpan(ir) {
	if (ir["message"]) {
		return;
	}

	var query = DDG.get_query().replace(/\s*(metacpan|meta cpan|cpan)\s*/i, '');
	var name  	 = ir["documentation"] ? ir["documentation"] : "No documentation specified.";
	var author 	 = ir["author"] ? ir["author"] : "No author specified.";
	var abstract = ir["abstract"] ? ir["abstract"] : "No abstract specified.";
	var desc  	 = ir["description"] ? ir["description"] : "No description specified.";
	var version  = ir["version"] ? ir["version"] : "No version given.";

	var head = query + ' (MetaCPAN)';

	var text = "<i>Abstract</i>: " + abstract + "<br>"
	     + "<i>Author</i>: " + author + "<br>"
	     + "<i>Version</i>: " + version + "<br>";


	if (desc) {
		var short_desc = '';
		var max_len = 340;

		if (desc.length > max_len)
			short_desc = desc.substring(0, max_len) + '...';
		else
			short_desc = desc;

		text += "<i>Description</i>: " + short_desc + "<br>";
	}

	var items = [[]];
	items[0]['a'] = text;
	items[0]['h'] = head;
	items[0]['s'] = 'MetaCPAN';
	items[0]['force_no_fold'] = 1;
	items[0]['u'] = 'https://metacpan.org/search?q=' + encodeURIComponent(name);
	items[0]["force_big_header"] = true;

	nra(items);
}