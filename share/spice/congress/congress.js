function ddg_spice_congress(api_result) {
    "use strict";

    if (!api_result || api_result.status !== "OK" || api_result.results.length === 0) {
        return;
    }
    
    var state   = api_result.results[0].state;
    var chamber = api_result.results[0].chamber;

    Spice.add({
        data             : api_result.results[0],
        header1          : 'Members of the ' + state + ' ' + chamber,
        sourceUrl       : "http://topics.nytimes.com/top/reference/timestopics/" +
                           "organizations/c/congress/index.html",
        sourceName      : 'The New York Times',

        template_frame   : 'list',
        templates: {
            items: api_result.results[0].members, 
            item: Spice.congress.congress,
            show: 3,
            type: 'ul'
        },

        
        
        id       : "congress",
        is_house         : (chamber == "House")
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
