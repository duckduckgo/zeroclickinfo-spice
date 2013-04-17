// TODO
//    - Title, authors, date, journal, doi.
//    - Maybe facets with highlighted terms?
//    - How about some altmetrics? http://api.plos.org/alm/faq/
//    - Limit the number of authors to avoid filling the display.
//    - Extract only year from publication date.
//    - linkify the title with doi.
//    - Format display with css.

function ddg_spice_plos(request) {

  // Get query and exclude the trigger.
  var query = DDG.get_query().replace(/plos/, "");

  // Check if response is OK.
  var status = request['responseHeader']['status'];
  if (status === 0) {

    // Fetch information.
    var qtime = request['responseHeader']['QTime'];
    var numFound = request['response']['numFound'];
    
    // Get docs and define loop limit.
    var docs = request['response']['docs'];
    if (docs.length < 5) {
      var limit = docs.length;
    } else {
      var limit = 5;
    };

    // Create object for results.
    var results = 'Data Provided by PLOS<br><ul>';

    // Loop over documents.
    for (var i = 0; i < limit; i++) {
      // Define article and its variables.
      var doc = docs[i];
      var title = doc['title_display'];
      var authors = doc['author_display'].join(', ');
      var journal = doc['journal'];
      var pubdate = doc['publication_date'];
      var id = doc['id'];
      results += '<li>'
              + title + '<br>'
              + authors + '<br>'
              + journal + '<br>'
              + pubdate + '<br>'
              + id;
      results = results + '</li>'
    };

    // Finish results.
    results = results + '</ul>';
    results = results + 'Found ' + numFound + ' results in ' + qtime + ' ms';

    // Define callback items.
    var items = [[]];
    items[0] = {
      a: results,
      h: 'PLOS research articles: ' + query,
      s: 'PLOS',
      u: 'http://www.plosone.org/search/advancedSearch.action?pageSize=50&unformattedQuery=' + query,
      force_big_header: true,
    }
    nra(items);
  }
}
