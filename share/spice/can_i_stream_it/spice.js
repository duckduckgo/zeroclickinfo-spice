function ddg_spice_can_i_stream_it(movie) {
      // console.log(xk);

      var result,img,snippet,link,div;

      // validity check
      if (movie && movie['_id']) {

        result = movie;

        // Make title for header
        var header = result.title.substring(0,49);
        if (result.title.length > 50) header += '...';


        // Call nra function as per Spice Plugin Guidelines
        items = new Array();
        items[0] = new Array();
        items[0]['a'] = result.title + ' is a '+result.year+ ' movie';

        items[0]['h'] = header;

        // Source name and url for the More at X link.
        items[0]['s'] = 'CanIStream.It';
        items[0]['u'] = result.links.shortUrl;

        // Force no compression.
        items[0]['f'] = 1;

        // Thumbnail url
        items[0]['i'] = result.image;

        // The rendering function is nra.
        nra(items);
     }
    }
