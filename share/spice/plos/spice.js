function ddg_spice_plos(request) {
  // var query = decodeURIComponent(rq); // Get query?

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
    var items = new Array();
    items[0] = new Array();
    items[0]['a'] = results;
    items[0]['h'] = 'PLOS research articles';
    items[0]['s'] = 'PLOS';
    items[0]['u'] = 'http://plos.org/';
    items[0]['force_big_header'] = 1;
    nra(items);
  }
}
