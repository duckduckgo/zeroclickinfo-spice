function ddg_spice_plos(api_result) {

    // Grab number of results.
    var numFound = api_result.response.numFound;

    // if no results, don't show spice.
    if (numFound < 1) return

    // Get query, exclude the trigger, and exclude preceding/trailing white space.
    var script = $('[src*="/js/spice/plos/"]')[0];
    var source = $(script).attr("src");
    var query = source.match(/plos\/([^\/]+)/)[1];

    Spice.add({
         data               : api_result.response.docs,
         
         
         header1            : decodeURIComponent(query) + ' (PLOS)',
         sourceName        : 'PLOS',
         sourceUrl         : 'http://www.plosone.org/search/advanced?unformattedQuery=' + query,
         id         : 'plos',
         template_frame     : 'list',
         templates   : {
            items: api_result.response.docs,
            show: 5,
            max: 10,
            item: Spice.plos.plos,
         },
    });
}

// Convert full publication date to year only.
Handlebars.registerHelper('year', function(pubdate) {
    var year = pubdate.substr(0, 4);
    return year;
});
