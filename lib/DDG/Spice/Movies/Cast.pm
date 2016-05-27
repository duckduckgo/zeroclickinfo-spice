package DDG::Spice::Movies::Cast;

use DDG::Spice;

spice to => 'https://api.themoviedb.org/3/search/person?query=$1&api_key={{ENV{DDG_SPICE_THE_MOVIE_DB_KEY}}}&callback={{callback}}';

spice alt_to => {
    details => {
        to => 'http://api.themoviedb.org/3/discover/movie?with_cast=$1&api_key={{ENV{DDG_SPICE_THE_MOVIE_DB_KEY}}}&sort_by=popularity.desc',
        wrap_jsonp_callback => 1
    }
};

my @triggers = share("triggers.txt")->slurp;
triggers start => @triggers;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
