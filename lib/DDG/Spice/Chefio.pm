package DDG::Spice::Chefio;
# ABSTRACT: Returns package information from npm package manager's registry.

use DDG::Spice;

primary_example_queries "cookbook for php";
description "Shows an cookbook from Chef.io";
name "chefio";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Chefio.pm";
category "software";
attribution github  => ['https://github.com/mirage-nl', 'Sven Thiessen'];

triggers startend => "cookbook for", "cookbook chef", "chef cookbook";

spice to => 'https://supermarket.chef.io/api/v1/search?q=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return lc $_ if $_;
	return;
};

1;
