function ddg_spice_search_code(api_response) {
    var query = api_response.query;
    var data = api_response.results;

    if(!data.length || !data.length > 0) return;

    var searchterm; // holds the search term
    var result; // holds the main result

    for (var i = 0; i < data.length; i++) {
        var tmp_result = data[i];
        if (!DDG.isRelevant(tmp_result.name
                                + ' ' + tmp_result.displayname
                                + ' ' + tmp_result.namespace,
                            [],
                            2))
            continue;
        result = tmp_result;
        break;
    }

    if (!result) {
        return;
    }

    function formatName(result) {
        var formatted_name = result.name;

        if (result.displayname !== '' || result.namespace !== '') {
            formatted_name += ' (';

            if (result.displayname !== '') {
                formatted_name += result.displayname;
            }

            if (result.namespace !== '') {
                formatted_name += (result.displayname ? ', ' : '') + result.namespace;
            }

            formatted_name += ')';
        }

        return formatted_name;
    }

    Spice.render({
        data             : result,
        header1          : formatName(result),
        source_url       : 'http://searchco.de/?q='
                           + encodeURIComponent(searchterm),
        source_name      : 'search[code]',
        template_normal  : 'search_code',
        force_big_header : true,
    });
}
