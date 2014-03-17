function ddg_spice_congress(api_result) {
    "use strict";
    console.log(api_result);
    if (!api_result || api_result.count === 0) {
        return;
    }
    
    var state = api_result.results[0].state_name;
    var chamber = api_result.results[0].chamber;

    Spice.render({
        data             : api_result.results,
        header1          : 'Members of the ' + state + ' ' + chamber,
        source_url       : "https://www.govtrack.us/congress/members/"+state,
        source_name      : 'govtrack.us',

        template_frame   : 'list',
        template_options: {
            items: api_result.results, 
            template_item: "congress",
            show: 3,
            type: 'ul'
        },

        force_big_header : true,
        force_no_fold: true,
        spice_name       : "congress",
        is_house         : (chamber == "House")
    });
}


/*******************************
  Handlebars helpers
  *******************************/

// Creates a full name for a given representative
Handlebars.registerHelper ('get_name', function() {
    "use strict";
    return this.title + '. ' + this.first_name + ' ' +
           (this.middle_name ? this.middle_name + ' ' : '') +
           this.last_name;
});

Handlebars.registerHelper ('get_date', function() {
    "use strict";
    var date = this.term_end.substring(0,4);
    return date
});