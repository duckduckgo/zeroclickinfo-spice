package DDG::Spice::BikeSharing::BayAreaBikeShareCA;

use strict;
use DDG::Spice;

triggers any => 'bike sharing', 'bike share', 'bikeshare';

spice to => 'http://www.bayareabikeshare.com/stations/json';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;
spice proxy_cache_valid => '200 304 15m';

my @places = ("bay area", "san francisco", "sfo", "sf", "san jose", "mountain view", "palo alto", "redwood", "redwood city");
my $place_re = join "|", @places;

handle remainder => sub {
    my $place = $_ || undef;

    unless ($place) {
        $place = $loc->city if $loc && $loc->city;
    }

    return unless $place && $place =~ m/\b($place_re)\b/;
    return $1;
};

1;
