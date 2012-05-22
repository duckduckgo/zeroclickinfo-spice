function ddg_spice_search_code(data) {

	var snippet = []; // To store the results
	var searchterm; // olds the search term
	var resultscount = 1; // Number of results to display

	if(data.results.length > 0) {
		searchterm = data.query;
	
		for (var i = 0; i < data.results.length; i++){
			var lines = '';
			for (var key in data.results[i].lines) {
				key = parseInt(key);
				lines = lines + search_codeFormatLineHTML(data.results[i].id, key+1 ,data.results[i].lines[key]);
			}
			
			var div = d.createElement('div');
			var div2 = d.createElement('div');
			YAHOO.util.Dom.addClass(div2,'zero_click_searchcode');
			var out = search_codeFormatResultHTML(data.results[i],lines);
			
			div2.innerHTML = out;
			div.appendChild(div2);
			
			snippet[i] = Array();
			snippet[i]['a'] = div.innerHTML;
			snippet[i]['h'] = 'search[code]';
			snippet[i]['s'] = 'search[code]';
			snippet[i]['u'] = 'http://searchco.de/?q='+searchterm+'&cs=true';
			//snippet[i]['f'] = 1;
			
			// If there is ever a call to have more results
			// can just increment resultscount
			if(i == resultscount-1) break;
		}
		
		// DDG rendering function is nra.
		nra(snippet);
	}
}

// Need to rtrim the line, escape HTML and add newline on the end
function search_codeRtrimEscapeNewline(line) {
	return line.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\s+$/,"")+'\r\n';
}

function search_codeFormatResultHTML(result,lines) {
	return '<h4>' + result.filename + '</h4><pre>' + lines + '</pre>';
}

function search_codeFormatLineHTML(id,key,line) {
	return '<code><a href="http://searchco.de/codesearch/view/' + id + '#' + key + '">' +key + '.</a> ' + search_codeRtrimEscapeNewline(line) + '</code>';
}
