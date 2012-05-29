function ddg_spice_search_code(data) {

	var snippet = []; // To store the results
	var searchterm; // holds the search term
	var resultscount = 1; // Number of results to display
	var result; // holds the main result

	if(data.results.length > 0) {
		result = data.results[0];
		searchterm = data.query;
	
		var div = d.createElement('div');
		var div2 = d.createElement('div');
		YAHOO.util.Dom.addClass(div2,'zero_click_searchcode');
			
		div2.innerHTML = search_codeFormatZeroClick(result);

		div.appendChild(div2);
			
		snippet[0] = Array();
		snippet[0]['a'] = div.innerHTML;
		snippet[0]['h'] = search_codeFormatName(result);
		snippet[0]['s'] = 'search[code]';
		snippet[0]['u'] = 'http://searchco.de/?q='+encodeURIComponent(searchterm);
			
		// DDG rendering function is nra.
		nra(snippet);
	}
}

function search_codeFormatName(result) {
	if(result.namespace != '') {
		return result.name + ' (' + result.namespace + ')';
	}
	return result.name;
}

function search_codeFormatZeroClick(result) {
	if(result.synopsis != '') {
		return '<pre><code>' + search_codeStrip(result.synopsis) + '</code></pre>' + result.description + '<br>[<a href="'+result.url+'">Reference</a>]';
	}
	var desc = result.description;
	if(result.description.length > 250) {
		desc = result.description.substring(0,250)+'...'
	}
	return desc + '<br>[<a href="'+result.url+'">Reference</a>]';
}

// This uses the browser to strip HTML, possibly YUI2 has better way to do this
function search_codeStrip(html) {
	var tmp = document.createElement("div");
	tmp.innerHTML = html;
	return tmp.textContent||tmp.innerText;
}
