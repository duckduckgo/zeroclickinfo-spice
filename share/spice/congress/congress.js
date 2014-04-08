(function(env) {
    "use strict";

    env.ddg_spice_congress = function(api_result) {
	
	if (!api_result || !api_result.results || api_result.results.length === 0) {
        return;
    }

    var state = api_result.results[0].state_name;
    var chamber = api_result.results[0].chamber;

    // sort by district for House members
    if(chamber == 'house')
        api_result.results = sortDistrict(api_result.results);

	Spice.add({
		id: 'congress',
		name: 'U.S. ' + capitalize(chamber) + ' ' + '(' + state + ')',
		data: api_result.results,

		meta: {
			sourceName: 'govtrack.us',
			total: api_result.results.length,
			sourceUrl: "https://www.govtrack.us/congress/members/"+state
		},

		templates: {
			item: Spice.congress.congress
		}

	});
 
   };

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
}(this));


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

