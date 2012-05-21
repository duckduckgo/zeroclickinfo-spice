function ddg_spice_search_code(data) {

	var snippet = []; // To store the results
	var searchterm;

	if(data.results.length > 0) {
		snippet[0] = Array();
		snippet[1] = Array();
		snippet[2] = Array();
		searchterm = data.query;
	
		for (var i = 0; i < data.results.length; i++){
			var lines = '';
			for (var key in data.results[i].lines) {
				key = parseInt(key);
				lines = lines + searchcodeFormatLineHTML(data.results[i].id, key+1 ,data.results[i].lines[key]);
			}
			
			var div = d.createElement('div');
			var div2 = d.createElement('div');
			YAHOO.util.Dom.addClass(div2,'zero_click_searchcode');
			var out = searchcodeFormatResultHTML(data.results[i],lines);
			
			div2.innerHTML = out;
			div.appendChild(div2);
			
			snippet[i]['a'] = div.innerHTML;
			snippet[i]['h'] = 'search[code] ' + '(' + searchterm + ')';
			snippet[i]['s'] = 'search[code]';
			snippet[i]['u'] = 'http://searchco.de/?q='+searchterm+'&cs=true';
			
			if(i == 2) break;
		}
		
		// DDG rendering function is nra.
		nra(snippet);
	}
}

// Need to rtrim the line, escape HTML and add newline on the end
function searchcodeRtrimEscapeNewline(line) {
	return line.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\s+$/,"")+'\r\n';
}

function searchcodeFormatResultHTML(result,lines) {
	return '<h4>' + result.filename + ' ' + result.location +'</h4><pre>' + lines + '</pre>';
}

function searchcodeFormatLineHTML(id,key,line) {
	return '<a href="http://searchco.de/codesearch/view/' + id + '#' + key + '">' +key + '. ' + searchcodeRtrimEscapeNewline(line) + '</a>';
}
