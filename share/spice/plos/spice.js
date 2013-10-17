function ddg_spice_plos(request) {

  // Get query and exclude the trigger.
  var query = DDG.get_query().replace(/plos/i, "");

  // Check if response is OK and results > 0.
  var status = request['responseHeader']['status'];
  var numFound = request['response']['numFound'];

  if (status === 0 && numFound > 0) {
    // Get docs and define loop limit.
    var docs = request['response']['docs'];
    var limit = 5;
    if (docs.length < 5) {
      limit = docs.length;
    }

    // Create object for results and citation.
    var results = '<div id="results">'
                + '<span id="credit">Data Provided by PLOS</span>'
                + '<ul>';
    var citation = '';

    // Loop over documents.
    for (var i = 0; i < limit; i++) {
      // Define article and its variables.
      var doc = docs[i];
      var id = doc['id'];
      var title = doc['title_display'];
      var author_list = doc['author_display'];
      var authors = author_list.join(', ');
      var journal = doc['journal'];
      var volume = doc['volume'];
      var issue = doc['issue'];
      var pubdate = doc['publication_date'];
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
                + '<span class="title" title="' + hover + '">' + title + '</span>'
                + '</a>' + ' (' + year + ')';

      // Close up citation.
      citation += '</li>';
    };

    // Finish results.
    results += citation
            + '</ul>'
            + '</div>';

    // Define callback items.
    var items = [[]];
    items[0] = {
      a: results,
      h: query + ' (PLOS)',
      s: 'PLOS',
      u: 'http://www.plosone.org/search/advancedSearch.action?pageSize=50&unformattedQuery=' + query,
      force_big_header: true,
    }
    nra(items);
  }
}
