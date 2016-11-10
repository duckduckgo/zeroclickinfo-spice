package DDG::Spice::DogoMovies;

use DDG::Spice;

triggers any => "dogomovies", "dogo movies", "dogo", "kids", "kid", "child", "children";

spice to => 'https://api.dogomedia.com/api/v2/movies/search.json?query=$1&api_key={{ENV{DDG_SPICE_DOGO_APIKEY}}}';
spice wrap_jsonp_callback => 1;

handle query_lc => sub {
    return $_ if $_ =~ /(movie|film|dvd|trailer)/i;
    return;
};

1;
