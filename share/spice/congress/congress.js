(function(env) {
    "use strict";

    env.ddg_spice_congress = function(api_result) {
    
        if (!api_result || !api_result.results || api_result.results.length === 0) {
            return Spice.failed("congress");
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

        var state = api_result.results[0].state_name,
        chamber = api_result.results[0].chamber;

        var itemType;  

        if(chamber == 'house') {
            results = sortDistrict(results);
            itemType =  'U.S. ' + DDG.capitalize(chamber) + ' Representatives from ' + state;
        }
        else{
            itemType =  'U.S. ' + 'Senators from ' + state;
        }


        Spice.add({
            id: 'congress',
            name: 'Congress',
            data: results,
            meta: {
                sourceName: 'govtrack.us',
                sourceUrl: "https://www.govtrack.us/congress/members/"+state,
                itemType: itemType
            },
        normalize: function(item) {
            var image = "https://www.govtrack.us/data/photos/"+item.govtrack_id+"-200px.jpeg";

            var name = (item.title ? item.title + '. ' : '') 
                        + (item.first_name ? item.first_name + ' ' : '') 
                        + (item.last_name ? item.last_name : '');

            var party;

            switch(item.party){
                case "D":
                    party = "Democratic";
                    break;
                case "R":
                    party = "Republican";
                    break;
                case "I":
                    party = "Independent";
                    break     
            }

            return {
                url: "https://www.govtrack.us/congress/members/" + item.govtrack_id,
                img: image,
                img_m: image,
                image: image,            
                heading: name,
                title: name,
                party: party
            };
        },
            templates: {
                group: 'products',
                options: {
                    buy: Spice.congress.buy,
                    rating: false,
                    variant: 'narrow',
            price: false,
            brand: false
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

        // return the chamber from the search query
    function getChamber(string){
        //matches senate, senator
        if(string.indexOf("senat") != -1)
            return 'senate';
        // matches rep, represenative(s), and house
        if(string.indexOf("rep") !== -1 || string.indexOf("house") != -1)
            return 'house';
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

