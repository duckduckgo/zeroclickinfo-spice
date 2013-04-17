function ddg_spice_plos(request) {
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
      var doc = docs[i]
      results  += '<li>'
              + doc['title_display']
              + '</li>'
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
