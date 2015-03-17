package DDG::Spice::DogoMovies;

use DDG::Spice;

primary_example_queries "kids movies";
secondary_example_queries "frozen kids movie", "hunger games movies";
description "Search for kids movie reviews and ratings";
name "DOGOmovies";
code_url "https://github.com/dogomedia/zeroclickinfo-spice/blob/master/lib/DDG/Spice/DogoMovies.pm";
topics "entertainment", "everyday";
category "entertainment";
attribution twitter => ['http://twitter.com/dogomovies','DOGOmovies'],
            github  => ['https://github.com/dogomedia','DOGO Media, Inc.'];

triggers any => "dogomovies", "dogo movies", "movie", "movies", "film", "films", "dvd", "dvds", "trailer", "trailers";

spice to => 'http://api.dogomedia.com/api/v2/movies/search.json?query=$1&api_key={{ENV{DDG_SPICE_DOGO_MOVIES_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    # Handles queries like 'kids movies', 'movies for children'
    return $_ if $_ =~ /(kid|children)/i;
    
    # Handles queries like 'harry potter movie reviews', 'lorax movie ratings'
    return $_ if $_ =~ /(review|rating)/i; 
    
    # Handles queries like 'dogomovies', 'dogo movies'
    return "popular" if $_ eq '';
    
    return $_ if $_;
    return;
};

1;
