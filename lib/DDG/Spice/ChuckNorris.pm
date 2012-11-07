package DDG::Spice::ChuckNorris;

use DDG::Spice;

primary_example_queries "chuck norris facts";
secondary_example_queries "chuck norris jokes";
description "Chuck Norris facts";
name "ChuckNorris";
source "Chuck Norris Database";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/ChuckNorris.pm";
topics "special_interest";
category "random";
attribution github => ['https://github.com/mr-mayank-gupta','Mayank Gupta'],
           twitter => ['http://twitter.com/iammayankg','Mayank Gupta'];

spice proxy_cache_valid  => "418 1d";
spice is_unsafe => 1;
triggers start => 'chuck norris fact','chuck norris facts','chuck norris joke','chuck norris jokes';
spice to => 'http://api.icndb.com/jokes/random?escape=javascript&callback={{callback}}';
handle remainder => sub {
	return @_ ;
};
1;
