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
         template_frame     : 'list',
         template_options   : {
            items: api_result.response.docs,
            show: 5,
            max: 10,
            template_item: 'plos',
         },
    });
}

// // To be adapted for list template...
// Handlebars.registerHelper('showDocs', function(docs) {

//     // Get docs and define loop limit.
//     var limit = 5;
//     if (docs.length < 5) {
//       limit = docs.length;
//     }

//     // Create object for results and citation.
//     var results = '<ul>';
//     var citation = '';

//     // Loop over documents.
//     for (var i = 0; i < limit; i++) {
//       // Define article and its variables.
//       var doc = docs[i];
//       var id = doc.id;
//       var title = doc.title_display;
//       var author_list = doc.author_display;
//       var authors = author_list.join(', ');
//       var journal = doc.journal;
//       var volume = doc.volume;
//       var issue = doc.issue;
//       var pubdate = doc.publication_date;
//       var year = pubdate.substr(0, 4);
//       var hover = '';

//       // Write article citation.
//       citation += '<li>';

//       // Author list.
//       hover += authors + '. ';

//       // Journal, only add if it is defined.
//       if (journal) {
//         hover += journal;
//         // Include volume and issue.
//         if (volume) {
//           hover += ' ' + volume;
//           if (issue) {
//             hover += '(' + issue + ')';
//           }
//         }
//       } 

//       // Publication date and year.
//       hover += ' ' + year;
      
//       // Start writing title link.
//       citation += '<a href="http://dx.doi.org/' + id + '">'
//                 + '<span title="' + hover + '">' + title + '</span>'
//                 + '</a>' + ' (' + year + ')';

//       // Close up citation.
//       citation += '</li>';
//     };

//     // Finish results.
//     results += citation
//             + '</ul>'
//             + '</div>';

//     return results;
// });
