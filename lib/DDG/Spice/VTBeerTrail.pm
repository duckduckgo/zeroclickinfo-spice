package DDG::Spice::VTBeerTrail;
# ABSTRACT: Returns a presentaion of Vermont breweries for travel and destination purposes.

use DDG::Spice;

# Meta Stuff: https://duck.co/duckduckhack/metadata
name "VTBeerTrail";
source "vtbeertrail.com";
icon_url "/i/vtbeertrail.com.ico";
description "Helping Craft Beer Fans Find Breweries in Vermont";

primary_example_queries "vermont breweries";
secondary_example_queries "vt breweries", "vermont beer", "vt beer", "vermont beer map", "vt beer map", "vermont beer guide", "vt beer guide";

category "food";
topics "travel", "food_and_drink";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/VTBeerTrail.pm";

attribution web => ['http://www.moosedog.io', 'Robin Hoover'],
            github => ['https://github.com/rhoover', 'Robin Hoover'],
            twitter => ['https://twitter.com/robinhoover', 'Robin Hoover'];

# Perl Stuff
triggers start => 'vermont', 'vt';
triggers any => 'beer', 'breweries', 'beer trail';

spice to => 'http://vtbeertrail.com/data/vtbrewers.json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return lc $_ if $_;
	return;
};

1;