package DDG::Spice::Showtimes;
# ABSTRACT: Write an abstract here

use DDG::Spice;
use strict;
use warnings;

use YAML::XS 'LoadFile';

my %cities = %{ LoadFile(share('cities.yml')) };

spice is_cached => 1;
spice proxy_cache_valid => "200 2h";
spice wrap_jsonp_callback => 1;

spice headers => { "X-API-Key" => "54TYZocmST5xtRiGhSRue7CPNfCToo3K" }; # ! YO PETE, REMOVE THIS!!
spice to => 'https://api.internationalshowtimes.com/v4/showtimes?city_ids=$1';

spice alt_to => {
    fetch_movie_data => {
        to => "https://api.internationalshowtimes.com/v4/movies/$1",
        headers => { "X-API-Key" => "54TYZocmST5xtRiGhSRue7CPNfCToo3K" }, # ! YO PETE, REMOVE THIS!!
        wrap_jsonp_callback => 1
    },
    fetch_cinema_data => {
        to => "https://api.internationalshowtimes.com/v4/cinema/$1",
        headers => { "X-API-Key" => "54TYZocmST5xtRiGhSRue7CPNfCToo3K" }, # ! YO PETE, REMOVE THIS!!
        wrap_jsonp_callback => 1     
    },
    fetch_pete_data => {
        to => "https://api.pete.com/v4/cinema/$1",
        headers => { "X-API-Key" => "54TYZocmST5xtRiGhSRue7CPNfCToo3K" }, # ! YO PETE, REMOVE THIS!!
        wrap_jsonp_callback => 1     
    }
};

triggers any => 'movies in', 'movie in', 'films in', 'film in';

# Handle statement
handle remainder => sub {
    my ($location) = $_;

    $location =~ tr/A-Z/a-z/;

    $location = $cities{$location}->{"id"};
    return if $location !~ /\d+/;

    # Query is in $_ or @_, depending on the handle you chose...if you
    # need to do something with it before returning
    return $location;
    return;
};

1;
