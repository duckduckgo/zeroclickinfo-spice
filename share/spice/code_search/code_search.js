function ddg_spice_code_search(response) {
    "use strict";

    var query = response.query;
    var data  = response.results;

	if (!data || data.length === 0) {
        return;
    }
    var result = data[0];

    var lines = [];
    for(var i in result.lines) {
        lines.push([i, result.lines[i]]);
    }

    lines.sort(function(a, b) {
        if(a[0] < b[0]) {
            return -1;
        }
        if(a[0] > b[0]) {
            return 1;
        }
        return 0;
    });

    var code = "";
    for(var i = 0; i < lines.length; i += 1) {
        code += lines[i][0] + ": " + lines[i][1] + "\n";
    }

    Spice.add({
        id: 'code_search',
        name: "Code Search",
        data             : { 'lines' : code },
        meta: {
            sourceUrl       : 'http://searchco.de/?q='
                                + encodeURIComponent(query)
                                + '&cs=true',
            sourceName      : 'search[code]',
        },
        template_group: 'info',
        templates: {
            options: {
                content: Spice.code_search.content
            }
        }
    });
}
