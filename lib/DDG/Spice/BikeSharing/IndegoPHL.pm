package DDG::Spice::BikeSharing::IndegoPHL;
use strict;
use DDG::Spice;

triggers any => 'indego', 'bikeshare', 'bike share', 'ride indego', 'share bike';

spice to => 'https://www.rideindego.com/stations/json/';
spice wrap_jsonp_callback => 1;
spice proxy_cache_valid => '200 304 15m';

my @places = ("philadelphia", "phl", "philly");
my $place_re = join "|", @places;

handle remainder_lc => sub {
    my $place = $_ || undef;

    unless ($place) {
        $place = $loc->city if $loc && $loc->city;
    }

    return unless $place && $place =~ m/\b(?:$place_re)\b/;
    return '';
};

1;
