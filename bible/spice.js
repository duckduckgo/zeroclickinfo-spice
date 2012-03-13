function nrbi(bi) {
    
    // console.log(bi[0]['text']);
    var snippet = '';
    
    // validity check
    if (bi[0]['bookname']) {
      
      // Link to be removed.
      var rmlink = '<a style=\"\" target=\"_blank\" href=\"http:\/\/bible.org\/page.php?page_id=3537\">&copy;NET<\/a>';
      
      // Their ToS require this link be at the end of the quote.
      var rpllink = '<a href=\" http://netbible.org\">&copy; NETBible.org<\/a>';
              
      snippet = '<b>' + bi[0]['bookname'];
       
      if (bi[0]['chapter']) snippet += ' ' + bi[0]['chapter'];
      if (bi[0]['verse']) snippet += ':' + bi[0]['verse'] + '</b>';
      if (bi[0]['text']) snippet += ' - ' + bi[0]['text'].replace(rmlink, rpllink);

      items = new Array();
      items[0] = new Array();
      items[0]['a'] = snippet;
      items[0]['h'] = '';

      // Source name and url for the More at X link.
      items[0]['s'] = 'Bible.org';
      items[0]['u'] = 'http://bible.org/';
      items[0]['f'] = 1;

      nra(items);
    }
}
