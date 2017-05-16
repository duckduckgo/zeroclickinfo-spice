package DDG::Spice::VtBeerTrail;
# ABSTRACT: Returns a presentaion of Vermont breweries for travel and destination research purposes.

use DDG::Spice;

# Meta Stuff: https://duck.co/duckduckhack/metadata
name "VtBeerTrail";
# source "http://vtbeertrail.com";
description "Helping Craft Beer Fans Find Breweries in Vermont";
icon_url "/i/vtbeertrail.com.ico";

primary_example_queries "vermont breweries";
secondary_example_queries "vt breweries", "vermont beer", "vt beer", "vermont beer map", "vt beer map", "vermont beer guide", "vt beer guide", "vermont beer trail", "vt beer trail";

category "food";
topics "travel", "food_and_drink", "special_interest";

code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/VtBeerTrail.pm";

attribution web => ['http://www.moosedog.io', 'Robin Hoover'],
            github => ['https://github.com/rhoover', 'Robin Hoover'],
            twitter => ['https://twitter.com/robinhoover', 'Robin Hoover'];

# Perl Stuff
triggers any => 'beer', 'breweries', 'beer trail', 'beer map';
triggers startend => 'vermont', 'vt';

spice to => 'http://vtbeertrail.com/data/vtbrewers.json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	# return lc $_ if $_;
	return $_ if $_;
	return;
};

1;