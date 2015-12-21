package DDG::Spice::BikeRacks;
# ABSTRACT: Write an abstract here
# Start at https://duck.co/duckduckhack/spice_overview if you are new
# to instant answer development
use strict;
use DDG::Spice;

name 'Philadelphia Bike Rack Locations';
source 'Bike Racks MOTU';
icon_url 'https://www.opendataphilly.org/dataset/bike-rack-locations-in-philadelphia';
description 'Search Bike Rack locations in Philadelphia';
primary_example_queries 'bike racks philadelphia', 'bike racks philly';
secondary_example_queries 'philly bike rack';
category 'geography';
topics 'everyday', 'travel', 'entertainment', 'geography';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/BikeRacks.pm';
attribution
            github => 'AcriCAA', 
            web  => ['http://www.coreyacri.com',  'Corey Acri'],
            web => ['https://codeforphilly.org/', "Built at Code for Philly"];

triggers any => 'bike rack', 'bikerack', 'bike racks', 'bikeracks';

spice to => 'https://data.phila.gov/resource/wgjz-gmue.json';
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