
var SKIP_ARRAY = [];
SKIP_ARRAY['movie'] = 1;
SKIP_ARRAY['film'] = 1;

function ddg_spice_movie(movie) {
    var request = DDG.get_query().replace("movie",'').replace("film", "");

    // validity check
    if (movie['total'] > 0 && movie['movies']) {

        // more than one result
        if (movie['total'] > 1) {

            // Default to first result incase nothing is more relevant
            result = movie["movies"][0];

            // check which movie title is most relevant
            for (var i = 0, aMovie; aMovie = movie.movies[i]; i++){
                if (DDG.isRelevant(aMovie.title, SKIP_ARRAY)) {
                    result = aMovie;
                    break;
                }
            }             
        } else {
            result = movie["movies"][0];
        }

        // Create snippet to be shown
        snippet = '';

        // Check presence of synopsis, and create element
        if (result.synopsis) synopsis = result.synopsis.substring(0,135) + "...";
        else if (result.critics_consensus && result.critics_consensus.length > 0) synopsis = result.critics_consensus.substring(0,135) + "...";
        else synopsis = '';

        var names = [];
        // Loop through abridged cast members, add to cast element
        for (var i=0; i < result.abridged_cast.length; i++){
            var pre = '';
            if ( i == result.abridged_cast.length - 1 && result.abridged_cast.length != 1 ) pre = 'and ';
            var name = result.abridged_cast[i].name;
            var url = 'http://www.rottentomatoes.com/celebrity/' + result.abridged_cast[i].id + '/';

            names.push(pre+'<a onlcick="fl=1" href="'+url+'">'+name+'</a>');
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
        //var score = 'with an audience score of'+ result.audience_score +'%';

        var rating, audience, critics, reaction, releaseDate, tomato;
        var currentTime = new Date();

        // Is a release date planned?
        if (result.release_dates.theater) {
            var rDate = result.release_dates.theater.split("-");
            var opened = new Date(rDate[0], rDate[1]-1, rDate[2], 00, 00, 00); // Date uses month-1 notation
            rating = (currentTime - opened < 0) ? "an upcoming " : "";
            releaseDate = (rating) ? opened.toDateString().slice(4) : result.year;
        }
        else if (result.year > currentTime.getFullYear()) {
            rating = "an upcoming ";
            releaseDate = result.year;
        }
        reaction = (rating) ? " want to see)" : " approved)";
        
        // Who's reviewed it?
        audience = (result.ratings.audience_score === -1) ? "" : result.ratings.audience_score+ "% audience"+reaction;
        critics = (result.ratings.critics_score === -1) ? "" : result.ratings.critics_score+ "% critics, ";
        critics += (audience) ? "" : reaction;

        // Is it fresh or rotten?
        tomato = (result.ratings.critics_rating) ? result.ratings.critics_rating+", " : "";

        if (!rating){
            releaseDate = result.year;
            if (result.mpaa_rating === "R" || result.mpaa_rating === "NC-17" || result.mpaa_rating == "Unrated"){
               rating = "an ";
            } else {
                rating = "a ";
            }
        }
        rating += result.mpaa_rating;
        
        // Call nra function as per Spice Plugin Guidelines
        items = [[]];
        items[0]['a'] = result.title + ' ('+result.year+ ') is ' 
                        +rating+ ' movie ('
                        +tomato
                        +critics
                        +audience
                        +cast + '. '
                        +synopsis;

        items[0]['h'] = header+" ("+releaseDate+")";

        // Source name and url for the More at X link.
        items[0]['s'] = 'Rotten Tomatoes';
        items[0]['u'] = result.links.alternate;

        // Force vertical expansion (no scrollbar)
        // items[0]['f'] = 1;

        // Thumbnail url
        items[0]['i'] = poster; 

        // The rendering function is nra.
        nra(items);
    }
}
