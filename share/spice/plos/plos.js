function ddg_spice_plos(api_result) {

    // Get query and exclude the trigger.
    var query = DDG.get_query().replace(/plos/i, "");

    // Check if response is OK and results > 0.
    // var status = api_result.responseHeader.status;
    var numFound = api_result.response.numFound;

    // if (status === 0 && numFound > 0) return
    if (numFound < 1) return

    Spice.render({
         data              : api_result,
         force_big_header  : true,
         header1           : query + ' (PLOS)',
         source_name       : "PLOS",
         source_url        : 'http://www.plosone.org/search/advancedSearch.action?pageSize=50&unformattedQuery=' + api_result.query,
         template_normal   : 'plos',
         template_small    : 'plos'
    });
}

Handlebars.registerHelper("showDocs", function(docs) {

    // Get docs and define loop limit.
    var limit = 5;
    if (docs.length < 5) {
      limit = docs.length;
    }

    // Create object for results and citation.
    var results = '<ul>';
    var citation = '';

    // Loop over documents.
    for (var i = 0; i < limit; i++) {
      // Define article and its variables.
      var doc = docs[i];
      var id = doc.id;
      var title = doc.title_display;
      var author_list = doc.author_display;
      var authors = author_list.join(', ');
      var journal = doc.journal;
      var volume = doc.volume;
      var issue = doc.issue;
      var pubdate = doc.publication_date;
      var year = pubdate.substr(0, 4);
      var hover = '';

      // Write article citation.
      citation += '<li>';

      // Author list.
      hover += authors + '. ';

      // Journal, only add if it is defined.
      if (journal) {
        hover += journal;
        // Include volume and issue.
        if (volume) {
          hover += ' ' + volume;
          if (issue) {
            hover += '(' + issue + ')';
          }
        }
      } 

      // Publication date and year.
      hover += ' ' + year;
      
      // Start writing title link.
      citation += '<a href="http://dx.doi.org/' + id + '">'
                + '<span title="' + hover + '">' + title + '</span>'
                + '</a>' + ' (' + year + ')';

      // Close up citation.
      citation += '</li>';
    };

    // Finish results.
    results += citation
            + '</ul>'
            + '</div>';

    return results;
});
