function ddg_spice_book(ir) {

    if (ir['total_results'] > 0) {

      // Making an array of results
      var book = ir['book'];

      var title = book.title;
      var author = book.author;
      var date = book.release_date;
      if (date.length > 0) var year = date.substring(0,4);
      var pages = book.pages;

     
      // header
      var header = title;
      if (author) header += ' by ' + author;
      if (year.length == 4) header += ' (' + year + ')'
      var header_short = header.substring(0,59);
      if (header.length > 60) header_short += ' ...';
   
      // genre and page info on book
      var bio = book.genre + ' book';
      if (pages) bio += ', ' + pages + ' pages';

      // rating overview
      var  rating  = book.title + ' (' + bio + ') '  +' is rated '
                   + "<a href=" 
                        + book.link + "#bookreviews>" +  book.rating + 
                        '% by ' + book.review_count + ' critics. '
                   + "</a>";

      //synopsis
      var synopsis = book.synopsis;
      var synopsis_short = "<i>Synopsis: </i>" + synopsis.substring(0,199);
      if (synopsis.length > 200) synopsis_short += ' ...';

      //snippet
      var snippet = book.review_sample.snippet;
      var review = '';

      if (snippet.length > 0){
            var source = book.review_sample.source;
            var snippet_short = snippet.substring(0,139);
            if (snippet.length > 140 ) snippet_short += ' ...';
            var review = ' <i> "' + snippet_short + '"</i>';
            if (source) review += '<b> - ' + source + '</b>' ;
      };
      

      //Summary
      var summary =  rating + '<br/>' 
                     + "<div align='justify';>" + synopsis_short + '</div>' 
                     + '<center>' + review + '</center>';
    

       items = new Array();
       items[0] = new Array();
       items[0]['a'] = summary;
       items[0]['h'] = header_short;

       // Source name and url for the More at X link.
       items[0]['s'] = 'idreambooks';
       items[0]['u'] = book.link;
       
       // Options
       items[0]['force_big_header'] = true;
       items[0]['force_space_after'] = true;
       items[0]['f'] = 1;

       // Thumbnail url //works with public images only 
       items[0]['i'] = book.image;
       // items[0]['i'] = 'https://d21k36m3c0ezbf.cloudfront.net/uploads/asset/image/293/passport_9781594202292.jpg';
      

       
       // The rendering function is nra.
       nra(items);
     }

}