function ddg_spice_search_code(data) {
    if(data.results.length > 0) {

        var searchterm; // holds the search term
        var result; // holds the main result

	for (var i=0; i<data.results.length; i++) {
	    var tmp_result = data.results[i];
	    if (!DDG.isRelevant(tmp_result.name + ' ' + tmp_result.displayname + ' ' + tmp_result.namespace, '', 2)) continue;
	    result = tmp_result;
	    break;
	}

	if (!result) return;

        searchterm = data.query;
    
        var div = d.createElement('div');
        var div2 = d.createElement('div');
        YAHOO.util.Dom.addClass(div2,'zero_click_searchcode');
            
        div2.innerHTML = search_codeFormatZeroClick(result);

        div.appendChild(div2);

	items = [[]];
	items[0]['a'] = div.innerHTML;
	items[0]['h'] = search_codeFormatName(result);
	items[0]['s'] = 'search[code]';
	items[0]['u'] = 'http://searchco.de/?q='+encodeURIComponent(searchterm);
        
	// DDG rendering function is nra.
	nra(items);
    }
}

function search_codeFormatName(result) {
    var formatted_name = result.name;

    if (result.displayname != '' || result.namespace != '') {
	formatted_name += ' (';
	
	if (result.displayname != '') formatted_name += result.displayname;
	
	if (result.namespace != '') formatted_name += (result.displayname ? ', ' : '') + result.namespace;

	formatted_name += ')';
    }
    
    return formatted_name;
}

function search_codeFormatZeroClick(result) {
    if(result.synopsis != '') {
        return '<pre><code>' + result.synopsis + '</code></pre>' + result.description + '<br>[<a href="'+result.url+'">Reference</a>]';
    } else {
        return result.description + '<br>[<a href="'+result.url+'">Reference</a>]';
    }   
}

// This uses the browser to strip HTML, possibly YUI2 has better way to do this
function search_codeStrip(html) {
    var tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent||tmp.innerText;
}