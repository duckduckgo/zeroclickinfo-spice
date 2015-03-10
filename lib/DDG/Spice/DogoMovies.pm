package DDG::Spice::DogoMovies;

use DDG::Spice;

primary_example_queries "kids movies";
secondary_example_queries "frozen kids movie", "hunger games kids movie reviews", "big hero 6 movie kids review";
description "Search the DOGOmovies database for kids movie reviews and ratings";
name "DOGOmovies";
code_url "https://github.com/dogomedia/zeroclickinfo-spice/blob/master/lib/DDG/Spice/DogoMovies.pm";
topics "entertainment", "everyday";
category "entertainment";
attribution github => ['https://github.com/dogomedia','DOGO Media'];

my @triggers = ( 
"dogomovies", 
"dogo movies", 

"children's movie", 
"children's movie review", 
"children's movie reviews", 
"children's movies", 

"kids movie",
"kids movie review",
"kids movie reviews", 
"kids movie trailer", 
"kids movie trailers", 
"kids movies",

"movie for children", 
"movie for kids", 
"movie kids review", 
"movie kids reviews", 
"movie review for kids", 
"movie review for children", 
"movie reviews for kids", 
"movie reviews for children", 

"movies for children", 
"movies for kids", 

"movie rating", 
"movie ratings",

"movie review",
"movie reviews"
);
triggers startend => @triggers;

spice to => 'http://api.dogomedia.com/api/v2/movies/search.json?query=$1&api_key={{ENV{DDG_SPICE_DOGO_MOVIES_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    return $_ if $_;
    return "popular";
};

1;
