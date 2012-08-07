// function ddg_spice_book(ir) {
//     // var snippet = 'test';
//     // ir['status']= 'OK';
//     //System.out.println("Hello World!");
//     if (ir['total_results'] > 0) {
//        var result = ir[book]
//        var  snippet = result.title + 'is rated '+ result.rating + '% by ' + result.review_count + ' critics.' ;



//        items = new Array();
//        items[0] = new Array();
//        items[0]['a'] = snippet;
//        items[0]['h'] = header;
//        items[0]['s'] = 'idreambooks';
//        items[0]['u'] = result.url;
//        items[0]['i'] = result.image;
//        nra(items);
//     }
// }


function ddg_spice_book(ir) {

    if (ir['total_results'] > 0) {

      // Making an array of results
      var book = ir['book'];
      
      // snippet
      var  snippet = book.title + 'is rated '+ book.rating + '% by ' + book.review_count + ' critics.' ;

      // Make title for header
      var title = book.title;
      var author = book.author;
      var header = title;
      if (author.length > 0) header += ' by ' + author;
      var header = header.substring(0,49);
      if (title.length > 50) header += '...';

       items = new Array();
       items[0] = new Array();
       items[0]['a'] = snippet;
       items[0]['h'] = header;

       // Source name and url for the More at X link.
       items[0]['s'] = 'idreambooks';
       items[0]['u'] = book.url;
       
       // Options
       items[0]['force_big_header'] = true;
       items[0]['force_space_after'] = true;

       // Thumbnail url
       //items[0]['i'] = book.image;
       items[0]['i'] = 'https://d21k36m3c0ezbf.cloudfront.net/uploads/asset/image/293/passport_9781594202292.jpg';
       //items[0]['i'] = 'http://localhost:3000//uploads/asset/image/111/thumb_9781594202292.jpg';

       // The rendering function is nra.
       nra(items);
     }

}