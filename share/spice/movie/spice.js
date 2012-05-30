var req = document.getElementById('search_form_input').value;
var skipArray = new Array();
skipArray['movie'] = 1;
skipArray['film']  = 1;

function ddg_spice_movie(movie) {
    console.log(movie);
    console.log('query is: '+req);
    var result = req.replace(/^movie\s+/g,'');
    console.log('scrubbed query is: '+result);

    // validity check
    if (movie['total'] > 0 && movie['movies']) {
        console.log('got movies');  

        // more than one result
        if (movie['total'] > 1) {
            console.log('find the right one.');
            // movie.movies.foreach(DDG.isRelevant( this.title, ['movie'] )
            var relevant = new RegExp(result, 'ig');

            // Default to first result incase nothing is more relevant
            result = movie["movies"][0];

            // check which movie title is most relevant
            for (var i = 0, aMovie; aMovie = movie.movies[i]; i++){
                if (isRelevant(aMovie.title, skipArray) ) {
                    console.log('relevant movie!');
                    console.log(aMovie.title);
                    result = aMovie;
                    break;
                }
            }             
        } else {
            console.log('DEFAULT MOVIE!');
            result = movie["movies"][0];
        }

        // Create snippet to be shown
        snippet = '';

        console.log('result is: ' +result); 
        // Check presence of synopsis, and create element

        if (result.synopsis) synopsis = result.synopsis.substring(0,140) + "...";
        else if (result.critics_consensus && result.critics_consensus.length > 0) synopsis = result.critics_consensus.substring(0,140) + "...";
        else synopsis = '';

        synopsis = '';

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
                        +cast + '. ' 
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