function ddg_spice_search_code(response) {
    var query = response.query;
    var data = response.results;

    if(!data.length || !data.length > 0) return;

    var searchterm; // holds the search term
    var result; // holds the main result

	for (var i = 0; i < data.length; i++) {
	    var tmp_result = data[i];
	    if (!DDG.isRelevant(tmp_result.name
                                + ' ' + tmp_result.displayname
                                + ' ' + tmp_result.namespace,
                            '',
                            2))
            continue;
	    result = tmp_result;
	    break;
	}

	if (!result) return;

    var header = result.displayname != '' && result.namespace != '' ?
                    '(' + (result.displayname != '' ?
                            result.displayname : '')
                        + (result.namespace != '' ?
                            (result.displayname ? ', ' : '') : result.namespace)
                        + ')'
                    : result.name;

    Spice.render({
        data             : result,
        header1          : header + ' (search[code])',
        source_url       : 'http://searchco.de/?q='
                           + encodeURIComponent(searchterm),
        source_name      : 'search[code]',
        template_normal  : 'search_code',
        force_big_header : true,
    });
}
