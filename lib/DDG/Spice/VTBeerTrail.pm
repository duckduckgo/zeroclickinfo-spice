package DDG::Spice::VTBeerTrail;
# ABSTRACT: Returns a presentaion of Vermont breweries for travel and destination purposes.

use DDG::Spice;

primary_example_queries "vermont breweries";
secondary_example_queries "vt breweries", "vermont beer", "vt beer", "vermont beer map", "vt beer map", "vermont beer guide", "vt beer guide";

name "VTBeerTrail";
description "Helping Craft Beer fans find breweries in Vermont";
source "vtbeertrail.com";
topics "tourism", "craft beer" "beer tourism";
category "travel";

attribution web => ['http://www.moosedog.io', 'Robin Hoover'],
            github => ['https://github.com/rhoover', 'Robin Hoover'];
            
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/VTBeerTrail.pm";
icon_url "/i/vtbeertrail.com.ico";

triggers start => 'vermont', 'vt';
triggers any => 'beer', 'breweries', 'beer trail';
spice to = 'http://vtbeertrail.com/data/vtbrewers.json';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return lc $_ if $_;
	return;
};

1;