function ddg_spice_congress(api_result) {
    "use strict";

    if (!api_result || api_result.count === 0 || api_result.results.length === 0) {
        return;
    }
    
    var state = api_result.results[0].state_name;
    var chamber = api_result.results[0].chamber;

    Spice.render({
        data             : api_result.results,
        header1          : 'Members of the U.S. ' + capitalize(chamber) + ' ' + '(' + state + ')',
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
        spice_name       : "congress"
    });

    //capitalize the chamber name
    function capitalize(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

/*******************************
  Handlebars helpers
  *******************************/

// Creates a full name for a given representative
Handlebars.registerHelper ('get_name', function() {
    "use strict";
    return (this.title ? this.title + '. ' : '') + (this.first_name ? this.first_name + ' ' : '') 
            + (this.middle_name ? this.middle_name + ' ' : '') 
            + (this.last_name ? this.last_name : '');
});

// return the next election year
Handlebars.registerHelper ('get_date', function() {
    "use strict";
    return (this.term_end ? this.term_end.substring(0,4) : null);

});