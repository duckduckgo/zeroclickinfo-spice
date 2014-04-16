(function(env) {     
    env.ddg_spice_plos = function(api_result) {
        "use strict";

        // Grab number of results.
        var numFound = api_result.response.numFound;

        // if no results, don't show spice.
        if (numFound < 1) {
            return;
        }

        // Get query, exclude the trigger, and exclude preceding/trailing white space.
        var script = $('[src*="/js/spice/plos/"]')[0];
        var source = $(script).attr("src");
        var query = source.match(/plos\/([^\/]+)/)[1];

        Spice.add({
            id: "plos",
            name: "PLOS",
            data: api_result.response.docs,
            meta: {
                itemType: decodeURIComponent(query) + ' (PLOS)',
                sourceName: "PLOS",
                sourceUrl: 'http://www.plosone.org/search/advanced?unformattedQuery=' + query
            }, 
            templates: {
                item: Spice.plos.item
             }
        });
    }
}(this));

// Convert full publication date to year only.
Handlebars.registerHelper('year', function(pubdate) {
    "use strict";

    var year = pubdate.substr(0, 4);
    return year;
});