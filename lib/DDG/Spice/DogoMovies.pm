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

triggers any => "dogomovies", "dogo movies", "dogo", "kids", "kid", "child", "children";

spice to => 'http://api.dogomedia.com/api/v2/movies/search.json?query=$1&api_key={{ENV{DDG_SPICE_DOGO_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    return $_ if $_ =~ /(movie|film|dvd|trailer)/i;
    return;
};

1;
