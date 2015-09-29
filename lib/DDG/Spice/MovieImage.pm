package DDG::Spice::MovieImage;
# ABSTRACT: Show movies from Rotten Tomatoes.

use strict;
use DDG::Spice;

triggers any => '///***never_trigger***///';

spice to => 'https://api.themoviedb.org/3/find/$1?api_key={{ENV{DDG_SPICE_MOVIEDB_APIKEY}}}&external_source=imdb_id';

# Uses $loc so needs to not cache back end.
spice is_cached => 0;

spice proxy_cache_valid => "200 30d";

handle query_lc => sub {
    return $_ if $_;
    return;
};
1;
