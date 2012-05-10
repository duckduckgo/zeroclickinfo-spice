function ddg_spice_movie(movie) {
      // console.log(xk);

      var result,img,snippet,link,div;

      // validity check
      if (movie['total'] > 0 && movie['movies']) {

        result = movie["movies"][0];

        // Create snippet to be shown
        snippet = '';

        // Check presence of synopsis, and create element
        if (result.synopsis.length > 0) synopsis = result.synopsis.substring(0,140) + "...";
        else if (result.critics_consensus && result.critics_consensus.length > 0) synopsis = result.critics_consensus.substring(0,140) + "...";
        else synopsis = '';

        var names = [];
        // Loop through abridged cast members, add to cast element
        for (var i=0; i < result.abridged_cast.length; i++){
          var pre = '';
          if ( i == result.abridged_cast.length - 1 && result.abridged_cast.length != 1 ) pre = 'and ';
          var name = result.abridged_cast[i].name;
          var url = 'http://www.rottentomatoes.com/celebrity/' + result.abridged_cast[i].id + '/';

          names.push(pre+'<a href="'+url+'">'+name+'</a>');
        }
        var cast = '';
        if (names.length > 1) cast = ', starring '+names.join(', ');

        // check for default poster
        var poster = result.posters.thumbnail;
        if (poster === 'http://images.rottentomatoescdn.com/images/redesign/poster_default.gif') poster = '';

        // Make title for header
        var header = result.title.substring(0,49);
        if (result.title.length > 50) header += '...';

        //Movie Score
        var score = 'with an audience score of'+result.audience_score+'%'

        // Call nra function as per Spice Plugin Guidelines
        items = new Array();
        items[0] = new Array();
        items[0]['a'] = result.title + ' is a '+result.year+ ' movie (' 
                        +result.mpaa_rating+ ', '
                        +result.ratings.audience_score+ '%, '
                        +result.ratings.critics_score+ '% critic approved)'
                        +cast+ '. ' 
                        +synopsis;
                        
        items[0]['h'] = header;

        // Source name and url for the More at X link.
        items[0]['s'] = 'Rotten Tomatoes';
        items[0]['u'] = result.links.alternate;

        // Force no compression.
        items[0]['f'] = 1;

        // Thumbnail url
        items[0]['i'] = poster; 

        // The rendering function is nra.
        nra(items);
     }
    }
