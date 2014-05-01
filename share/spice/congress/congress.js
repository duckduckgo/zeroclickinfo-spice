(function(env) {
    "use strict";

    env.ddg_spice_congress = function(api_result) {
    
        if (!api_result || !api_result.results || api_result.results.length === 0) {
            return Spice.failed("congress");
        }

        var state = api_result.results[0].state_name,
            chamber = api_result.results[0].chamber;

        // sort by district for House members
        // TODO: Use sorting block
        if(chamber == 'house')
            api_result.results = sortDistrict(api_result.results);

        Spice.add({
            id: 'congress',
            name: 'Congress',
            data: api_result.results,
            meta: {
                sourceName: 'govtrack.us',
                sourceUrl: "https://www.govtrack.us/congress/members/"+state,
                itemType: 'U.S. ' + DDG.capitalize(chamber) + ' Congressmen',
                secondaryText: state + " State"
            },
            templates: {
                group: 'base',
                detail: null,
                options: {
                    content: Spice.congress.content
		          }
            }
        });
   };

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
Handlebars.registerHelper ('congress_get_name', function(title, first_name, last_name) {
    "use strict";
    return (title ? title + '. ' : '')
            + (first_name ? first_name + ' ' : '')
            //+ (middle_name ? middle_name + ' ' : '')
            + (last_name ? last_name : '');
});

// return the next election year
Handlebars.registerHelper ('congress_get_date', function(term_end) {
    "use strict";
    if(term_end)
        return "Next Election " + term_end.substring(0,4);
    return null;
});

