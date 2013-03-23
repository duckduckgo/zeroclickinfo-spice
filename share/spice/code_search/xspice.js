function ddg_spice_code_search(response) {

    var query = response.query;
    var data  = response.results;

	if (!data || !data.length > 0) return;
    result = data[0];

    lines = [];
    for (var i in result.lines)
        lines.push(result.lines[i]);

    code = lines.map(function(line, i) {
        return {
            'id'   : result.id,
            'key'  : i + 1,
            'text' : line.replace(/&/g, '&amp;')
                         .replace(/"/g, '&quot;')
                         .replace(/'/g, '&#39;')
                         .replace(/</g, '&lt;')
                         .replace(/>/g, '&gt;')
                         .replace(/\s+$/, '')
                     + '\r\n',
        };
    });
    
    Spice.render({
        data             : { 'line' : code },
        header1          : result.filename + ' in ' + result.name + ' (search[code])',
        source_url       : 'http://searchco.de/?q='
                            + encodeURIComponent(query)
                            + '&cs=true',
        source_name      : 'search[code]',
        template_normal  : 'code_search',
    });
}
