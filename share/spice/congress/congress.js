(function(env) {
    "use strict";

    env.ddg_spice_congress = function(api_result) {
    
        if (!api_result || !api_result.results || api_result.results.length === 0) {
            return Spice.failed("congress");
        }

        var state = api_result.results[0].state_name,
            state_code = api_result.results[0].state,
            chamber = api_result.results[0].chamber;

        var itemType;    
        if(chamber == 'house') {
            itemType =  'U.S. ' + DDG.capitalize(chamber) + ' Representatives from ' + state;
        } else {
            itemType =  'U.S. ' + 'Senators from ' + state;
        }

        Spice.add({
            id: 'congress',
            name: 'Congress',
            data: api_result.results,
            meta: {
                sourceName: 'govtrack.us',
                sourceUrl: "https://www.govtrack.us/congress/members/" + state_code,
                primaryText: itemType
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
                        break;     
                }

                return {
                    url: "https://www.govtrack.us/congress/members/" + item.govtrack_id,
                    img: image,
                    img_m: image,
                    image: image,            
                    heading: name,
                    title: name,
                    district: DDG.getOrdinal(item.district),
                    party: party
                };
            },
            sort_fields: {
                district: function(a, b) {
                    if(chamber !== 'house') {
                        return;
                    }
                    var x = parseInt(a.district);
                    var y = parseInt(b.district);
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                }
            },
            sort_default: 'district',
            templates: {
                group: 'media',
                item_detail: false,
                detail: false,
                variants: {
                    tile: 'narrow',
                },
                elClass: {
                    tileTitle: 'tx--14' 
                },
                options: {
                    footer: Spice.congress.footer
                }
            }
        });
    };
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

