package DDG::Spice::BikeSharing::CitiBikeNYC;

use strict;
use DDG::Spice;

triggers any => 'citibike', 'citi bike', 'bike sharing', 'bike share', 'bikeshare';

spice to => 'https://gbfs.citibikenyc.com/gbfs/en/station_information.json';
spice wrap_jsonp_callback => 1;
spice is_cached => 0;
spice proxy_cache_valid => '200 304 15m';

my @places = ("new york city", "new york", "nyc", "ny", "brooklyn", "manhattan", "queens");
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
