package DDG::Spice::Movies::Filmography;

use DDG::Spice;

spice to => 'https://api.themoviedb.org/3/search/person?query=$1&api_key={{ENV{DDG_SPICE_MOVIEDB_APIKEY}}}&callback={{callback}}';

spice alt_to => {
    details => {
        to => 'http://api.themoviedb.org/3/discover/movie?with_people=$1&api_key={{ENV{DDG_SPICE_MOVIEDB_APIKEY}}}&sort_by=popularity.desc'
    }
};

my @nouns = (
    "newest movies",
    "newest movie",
    "new films",
    "new film",
    "newest films",
    "newest film",
    "movie",
    "movies",
    "film",
    "films",
);
my @triggers = ();
foreach (@nouns) {
    push @triggers, (
        $_ . " with",
        $_ . " starring",
        $_ . " featuring",
        $_ . " director",
        $_ . " directed by"
    )
}

triggers start => @triggers;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
