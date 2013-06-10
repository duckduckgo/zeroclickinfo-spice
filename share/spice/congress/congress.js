function ddg_spice_congress(api_result) {
    "use strict";

    if (!api_result || api_result.status !== "OK" || api_result.results.length === 0) {
        return;
    }
    
    var state   = api_result.results[0].state;
    var chamber = api_result.results[0].chamber;

    Spice.render({
        data             : api_result.results[0],
        header1          : 'Members of the ' + state + ' ' + chamber,
        source_url       : "http://topics.nytimes.com/top/reference/timestopics/" +
                           "organizations/c/congress/index.html",
        source_name      : 'The New York Times',
        template_normal  : 'congress',
        force_big_header : true
    });
}


/*******************************
  Handlebars helpers
  *******************************/

// Creates a full name for a given representative
Handlebars.registerHelper ('get_name', function() {
    "use strict";

    return this.first_name + ' ' +
           (this.middle_name ? this.middle_name + ' ' : '') +
           this.last_name;
});

// Returns vote percentage
Handlebars.registerHelper ('votes_pct', function() {
    "use strict";

    var pct = parseFloat(this.votes_with_party_pct).toFixed(0);
    return pct + "%";
});
