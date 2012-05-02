function ddg_spice_movie(movie) {
      // console.log(xk);

      var result,img,snippet,link,div;

      // validity check
      if (movie['total'] > 0 && movie['movies']) {

        result = movie["movies"][0];

        // Create snippet to be shown
        snippet = document.createElement('span');

        // Create poster img element, add class 'poster'
        posterImg = document.createElement('img');
        posterImg.src = result.posters.detailed;
        YAHOO.util.Dom.setStyle(img, "float", 'left');
        YAHOO.util.Dom.setStyle(img, "margin-left", '10px');
        
        // Link poster to more detailed information
        imgLink = document.createElement('a');
        imgLink.href = result.links.alternate;
        
        // Wrap img in an anchor(imgLink)
        imgLink.appendChild(posterImg);

        // Wrap imgLink in a div
        imgWrap = document.createElement('div');
        imgWrap.appendChild(imgLink);

        // Create top info div and contained elements
        topInfo = document.createElement('div');
        title   = document.createElement('p');
        year    = document.createElement('p');
        rating  = document.createElement('p');
        runtime = document.createElement('p');
        relDate = document.createElement('p');

        // Fill inner HTML of p elements
        title.innerHTML   = 'Title: '        + result.title;
        year.innerHTML    = 'Year: '         + result.year;
        rating.innerHTML  = 'Rating: '       + result.mpaa_rating;
        runtime.innerHTML = 'Runtime: '      + result.runtime + ' minutes'
        relDate.innerHTML = 'Release Date: ' + result.release_dates.theater;

        // Wrap elements  in topInfo div
        topInfo.appendChild(title);
        topInfo.appendChild(year);
        topInfo.appendChild(rating);
        topInfo.appendChild(runtime);
        topInfo.appendChild(relDate);

        // Create bottom info div and contained elements
        bottomInfo = document.createElement('div');
        cast       = document.createElement('p');
        synopsis   = document.createElement('p');
        more       = document.createElement('a');

        // Check presence of synopsis, and create element
        if (result.synopsis.length > 0) synopsis.innerHTML = result.synopsis.substring(0,140) + "...";
        else synopsis.innerHTML = "Sorry, no synopsis...";

        synopsis.innerHTML = 'Synopsis: ' + synopsis.innerHTML;

        var names = [];
        // Loop through abridged cast members, add to cast element
        for (var i=0; i < result.abridged_cast.length; i++){
          names.push(result.abridged_cast[i].name);
        }

        cast.innerHTML = 'Cast: ' + names.join(', ');

        more.href = result.links.alternate;
        more.innerHTML = "See more at Rotten Tomatoes..."

        // Wrap elements  in bottomInfo div
        bottomInfo.appendChild(cast);
        bottomInfo.appendChild(synopsis);
      
        // Wrap all divs in snippet div
        snippet.appendChild(imgWrap);
        snippet.appendChild(topInfo);
        snippet.appendChild(bottomInfo);
        
        // Call nra function as per Spice Plugin Guidelines
        items = new Array();
        items[0] = new Array();
        items[0]['a'] = snippet;
        items[0]['h'] = result.title;

        // Source name and url for the More at X link.
        items[0]['s'] = 'Rotten Tomatoes';
        items[0]['u'] = result.links.alternate;

        // Force no compression.
        items[0]['f'] = 1;

        // Thumbnail url
        //items[0]['i'] = 'https://icons.duckduckgo.com/i/www.rottentomatoes.com.ico';    

        // The rendering function is nra.
        nra(items);
     }
    }