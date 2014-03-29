function ddg_spice_congress(api_result) {
    "use strict";

    if (!api_result || !api_result.results || api_result.results.length === 0) {
        return;
    }
    
    var query = getChamber(DDG.get_query().toLowerCase());

    // location search returns a list of both senate and house members
    // figure out which the user searched for and push those member
    // to the result array.
    var results = [];
    for(var e in api_result.results){
        if(api_result.results[e].chamber == query){
            results.push(api_result.results[e]);
        }
    }

    var state = results[0].state_name;
    var chamber = results[0].chamber;

    // sort by district for House members
    if(chamber == 'house')
        results = sortDistrict(results);

    Spice.render({
        data             : results,
        header1          : 'Members of the U.S. ' + capitalize(chamber) + ' ' + '(' + state + ')',
        source_url       : "https://www.govtrack.us/congress/members/"+state,
        source_name      : 'govtrack.us',

        template_frame   : 'list',
        template_options: {
            items: results, 
            template_item: "congress",
            show: 3,
            type: 'ul'
        },

        force_big_header : true,
        force_no_fold    : true,
        spice_name       : "congress"
    });

    //capitalize the chamber name
    function capitalize(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Sort based on house member's district
    function sortDistrict(array){
        return array.sort(function(a, b){
            var x = a.district;
            var y = b.district;
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    // return the chamber from the search query
    function getChamber(string){
        //matches senate, senator
        if(string.indexOf("senat") != -1)
            return 'senate';
        // matches rep, represenative(s), and house
        if(string.indexOf("rep") !== -1 || string.indexOf("house") != -1)
            return 'house';
    }

    $('.congress_mobile').listview('refresh');

}

/*******************************
  Handlebars helpers
  *******************************/

// Creates a full name for a given representative
Handlebars.registerHelper ('get_name', function() {
    "use strict";
    return (this.title ? this.title + '. ' : '')
            + (this.first_name ? this.first_name + ' ' : '') 
            //+ (this.middle_name ? this.middle_name + ' ' : '') 
            + (this.last_name ? this.last_name : '');
});

// return the next election year
Handlebars.registerHelper ('get_date', function() {
    "use strict";
    if(this.term_end)           
        return "Next Election " + this.term_end.substring(0,4);
    return null;
});

// return the party
Handlebars.registerHelper ('get_party', function() {
    "use strict";
    if(this.party){
        switch(this.party){
            case "D":
                return "Democrat";
            case "R":
                return "Republican";
            case "I":
                return "Independent";
        }
    }
    return null;
});