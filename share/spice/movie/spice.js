function ddg_spice_movie(movie) {
    var request = DDG.get_query().replace("movie",'').replace("film", ""),
        result,
        blurb = "",
        cast = "",
        names = [],
        poster = "",
        header = "";

    // Verify things before accessing the object, amirite?
    if(Coral.verify(movie['total'], movie['movies'])) {
       // Get the movie titles and check which one is relevant.
       if(movie['total'] > 1) {
           result = movie.movies[0];
           var stop = false;
           result = _.find(movie.movies, function(aMovie) {
                return DDG.isRelevant(aMovie.title, {movie: 1, film: 1});
           });
       } else {
           result = movie.movies[0];
       }

       // Get the synopsis.
       if(Coral.verify(result.synopsis)) {
           blurb = result.synopsis;
       } else if(Coral.verify(result.critics_consensus)) {
           blurb = result.critics_consensus;
       }

       // Get the cast.
       _.each(result.abridged_cast, function(person) {
           names.push(person.name);
       });
       cast = _.str.toSentenceSerial(names);
       if(names.length > 1) cast = " starring " + cast;

       // Get the poster.
       poster = result.posters.thumbnail;
       if (poster === 'http://images.rottentomatoescdn.com/images/redesign/poster_default.gif') poster = '';

       // Get header.
       header = result.title;

       // Display the thing
       Coral.display({
           type: "standard",
           blurb: {
               text: header + " is an X movie" + cast + ". " + blurb,
               limit: "auto"
           },
           title: {
               text: header,
               limit: "auto",
               big: true
           },
           image: {
               url: poster,
               height: "auto",
               width: "auto"
           },
           source: {
               text: 'Rotten Tomatoes',
               url: result.links.alternate
           }
       });
    } 
}
