package DDG::Spice::BikeSharing::IndegoPHL;
use strict;
use DDG::Spice;

name 'PHL Indego Bikeshare Locations';
source 'Indego Philadelphia';
icon_url 'http://www.rideindego.com/';
description 'Search Indego Bike stations in Philadelphia';
primary_example_queries 'indego philadelphia', 'bikeshare philadelphia';
secondary_example_queries 'philly bikeshare';
category 'geography';
topics 'everyday', 'travel', 'entertainment', 'geography';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BikeSharing/IndegoPHL.pm';
attribution github => 'marianosimone',
            github => 'AcriCAA',
            web => ['http://www.marianosimone.com',  'Mariano Simone'],
            web  => ['http://www.coreyacri.com',  'Corey Acri'],
            web => ['https://codeforphilly.org/', "Built at Code for Philly"];

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