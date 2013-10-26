function ddg_spice_plos(api_result) {

    // Grab number of results.
    var numFound = api_result.response.numFound;

    // if no results, don't show spice.
    if (numFound < 1) return

    // Get query, exclude the trigger, and exclude preceding/trailing white space.
    var query = DDG.get_query().replace(/plos/i, '').replace(/(^\s+|\s+$)/g, '');

    Spice.render({
         data               : api_result.response.docs,
         force_big_header   : true,
         force_no_fold      : true,
         header1            : query + ' (PLOS)',
         source_name        : 'PLOS',
         source_url         : 'http://www.plosone.org/search/advanced?unformattedQuery=' + query,
         spice_name         : 'plos',
         template_frame     : 'list',
         template_options   : {
            items: api_result.response.docs,
            show: 5,
            max: 10,
            template_item: 'plos',
         },
    });
}

// Get list of authors and return string.
Handlebars.registerHelper('authors', function(author_display) {
    var author_list = author_display;
    var authors = author_list.join(', ');
    return authors;
});

// Convert full publication date to year only.
Handlebars.registerHelper('year', function(pubdate) {
    var year = pubdate.substr(0, 4);
    return year;
});
