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
       
      var to_read_or_not = ""; 
      if (book.rating >= 70) to_read_or_not = "must read";
      if (book.rating < 70) to_read_or_not = "don't read";

      // rating overview
      var  rating_overview  = " <img src=\""
                               + book.to_read_or_not 
                               + "\" style=\"display:inline;width:20px;height:auto;\""
                               + "alt=\""
                               + to_read_or_not
                               + "\" />"
                               + " " 
                               + book.title + ' (' + bio + ') '  +' is rated '
                               + "<a href=" 
                                    + book.detail_link + "#bookreviews>" +  book.rating + 
                                    '% by ' + book.review_count + ' critics. '
                               + "</a>";

      //synopsis
      var synopsis = book.synopsis;
      var synopsis_short = "<i>Synopsis: </i>" + synopsis.substring(0,149);
      if (synopsis.length > 150) synopsis_short += ' ...';

      // critic review
      var review_sample = book.critic_reviews[0]

      //snippet
      var snippet = review_sample.snippet;
      var review = '';

      if (snippet.length > 0){
            var source = review_sample.source;
            var snippet_short = snippet.substring(0,139);
            if (snippet.length > 140 ) snippet_short += ' ...';
            var review = ' <i> "' + snippet_short + '"</i>';
            if (source) review += '<b> - ' + source + '</b>' ;
      };
      

      //Summary
      var summary =  rating_overview + '<br/>' 
                     + "<div align='justify';>" + synopsis_short + '</div>' 
                     + '<center>' + review + '</center>';
    

       items = new Array();
       items[0] = new Array();
       items[0]['a'] = summary;
       items[0]['h'] = header_short;

       // Source name and url for the More at X link.
       items[0]['s'] = 'idreambooks';
       items[0]['u'] = book.detail_link;
       
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