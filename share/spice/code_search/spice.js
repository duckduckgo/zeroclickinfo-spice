function ddg_spice_code_search(data) {

	var snippet = [[]]; // To store the results
	var searchterm; // olds the search term
	var result = '';

	if(data.results.length > 0) {
		searchterm = data.query;
		result = data.results[0];
	
		var lines = '';
		for (var key in result.lines) {
			key = parseInt(key);
			lines = lines + code_searchFormatLineHTML(result.id, key+1 ,result.lines[key]);
		}
			
		var div = d.createElement('div');
		var div2 = d.createElement('div');
		YAHOO.util.Dom.addClass(div2,'zero_click_searchcode');
		var out = code_searchFormatResultHTML(result,lines);
			
		div2.innerHTML = out;
		div.appendChild(div2);
			
		snippet[0]['a'] = div.innerHTML;
		snippet[0]['h'] = result.filename + ' in ' + result.name;
		snippet[0]['s'] = 'search[code]';
		snippet[0]['u'] = 'http://searchco.de/?q='+encodeURIComponent(searchterm)+'&cs=true';
			
		
		// DDG rendering function is nra.
		nra(snippet);
	}
}

// Need to rtrim the line, escape HTML and add newline on the end
function code_searchRtrimEscapeNewline(line) {
	return line.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\s+$/,"")+'\r\n';
}

function code_searchFormatResultHTML(result,lines) {
	return '<pre>' + lines + '</pre>';
}

function code_searchFormatLineHTML(id,key,line) {
	return '<code><a href="http://searchco.de/codesearch/view/' + id + '#' + key + '">' +key + '.</a> ' + code_searchRtrimEscapeNewline(line) + '</code>';
}
