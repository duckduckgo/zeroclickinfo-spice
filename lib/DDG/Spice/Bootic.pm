package DDG::Spice::Bootic;
# ABSTRACT: Search for products on Bootic.

use DDG::Spice;

primary_example_queries "bootic watches";
secondary_example_queries "bootic irobot";
description "Search Bootic.";
name "Bootic";
icon_url "/i/www.bootic.com.ico";
source "Bootic";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Bootic.pm";
category "entertainment";
topics "special_interest";
attribution github => ['https://github.com/sparky','sparky'];

triggers any => 'bootic';
spice to => 'http://www.bootic.com/cgi-bin/api/search/products?output=json&callback={{callback}}&pretty_name=1&limit=48&smart=1&q=$1';

handle remainder => sub {
	return $_ if $_;
	return;
};

1;
