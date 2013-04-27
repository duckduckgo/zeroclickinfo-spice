// TODO
//    - Specify the exact fields to be returned using "&fl=field,field"
//      see http://api.plos.org/solr/search-fields/
//    - Add volume and issue to the citation.
//    - Display number of views from each aticle?
//    - Show/hide abstract?

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
    var results = '<div>'
                + '<span style="font-family:monospace;padding-bottom:1em;">Data Provided by PLOS</span>'
                + '<ol style="padding-top:0.5em;">';
    var citation = '';

    // Loop over documents.
    for (var i = 0; i < limit; i++) {
      // Define article and its variables.
      var doc = docs[i];
      var id = doc['id'];
      var title = doc['title_display'];
      var abstract = doc['abstract_primary_display'][0];
      var author_list = doc['author_display'];
      var authors = '';
      var journal = doc['journal'];
      var volume = doc['volume'];
      var issue = doc['issue'];
      var pubdate = doc['publication_date'];
      var year = pubdate.substr(0, 4);
      var views = doc['counter_total_all'];

      // Author list trimmed for more than 3 authors.
      if (author_list.length > 3) {
        authors = author_list.splice(0, 3).join(', ') + ', et al';
      } else {
        authors = author_list.join(', ');
      }

      // Write article citation.
      citation += '<li style="padding-bottom:0.5em;">';
      
      // Title, has to exist.
      citation += '<a href="http://dx.doi.org/' + id + '">'
                + '<span title="' + views + ' views">' + title + '</span>'
                + '</a><br>';

      // Author list.
      citation += '<span style="color:#444444;font-size:0.9em;">' + authors + '.</span> ';

      // Journal, only add if it is defined.
      if (journal) {
        citation += '<span style="color:#444444;font-style:italic;font-size:0.9em;">'
                + journal;
        // Include volume and issue.
        if (volume) {
          citation += ' ' + volume;
          if (issue) {
            citation += '(' + issue + ')';
          }
        }
        citation += '</span> ';
      } 

      // Publication date and year.
      citation += '<span style="color:#444444;font-size:0.9em;">' + year + '</span>';

      // Abstract, if present.
      if (abstract) {
        abstract_id = 'abstract' + i;
        citation += ' <a href="javascript:;" title="Toggle abstract" onclick="DDG.toggle(\'' + abstract_id + '\');">[+]</a>'
                  + '<div style="display:none;padding-top:3px;" id="' + abstract_id + '">'
                  + abstract
                  + '</div>';        
      }

      // Close up citation.
      citation += '</li>';
    };

    // Finish results.
    results += citation
            + '</ol>'
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
