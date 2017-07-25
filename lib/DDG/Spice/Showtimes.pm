package DDG::Spice::Showtimes;
# ABSTRACT: Write an abstract here

use DDG::Spice;
use strict;
use warnings;

use YAML::XS 'LoadFile';

spice is_cached => 1;
spice proxy_cache_valid => "200 2h";
spice wrap_jsonp_callback => 1;

spice headers => { "X-API-Key" => "54TYZocmST5xtRiGhSRue7CPNfCToo3K" }; # ! YO PETE, REMOVE THIS!!
spice to => 'https://api.internationalshowtimes.com/v4/showtimes?location=40.6781784,-73.9441579&distance=12&append=movies,cinemas&movie_fields=id,title,genres,poster_image_thumbnail&cinema_fields=id,name,telephone,website,location';

triggers any => 'movies in', 'movie in', 'films in', 'film in', 'showtimes in', 'showtime in';

# Handle statement
handle remainder => sub {
    my ($location) = $_;

    $location =~ tr/A-Z/a-z/;

    return $location;
    return;
};

1;
