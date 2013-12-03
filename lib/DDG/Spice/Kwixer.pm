package DDG::Spice::Kwixer;

use DDG::Spice;

spice to => 'https://kwixer.com/api/watching/movie/explore?take=20&skip=0&query=$1';
spice wrap_jsonp_callback => 1;
triggers any => 'movies with';

handle remainder => sub {
    return "$_" if $_;
};

1;

