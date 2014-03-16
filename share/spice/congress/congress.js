function ddg_spice_congress(api_result) {
    "use strict";

    if (!api_result || api_result.meta.total_count === 0) {
        return;
    }
    
    var state = api_result.objects[0].state;
    var chamber;

    if(api_result.objects[0].role_type == "senator")
        chamber = "Senate";
    else
        chamber = "House";

    Spice.render({
        data             : api_result.objects,
        header1          : 'Members of the ' + state + ' ' + chamber,
        source_url       : "https://www.govtrack.us/congress/members/"+state,
        source_name      : 'govtrack.us',

        template_frame   : 'list',
        template_options: {
            items: api_result.objects, 
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
    return this.title + ' ' + this.person.firstname + ' ' +
           (this.person.middlename ? this.person.middlename + ' ' : '') +
           this.person.lastname;
});
