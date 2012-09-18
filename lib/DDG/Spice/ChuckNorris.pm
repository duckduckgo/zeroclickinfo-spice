package DDG::Spice::ChuckNorris;

use DDG::Spice;

spice proxy_cache_valid  => "418 1d";

triggers start => 'chuck norris fact','chuck norris facts','chuck norris joke','chuck norris jokes';
spice to => 'http://api.icndb.com/jokes/random?exclude=%5Bexplicit%5D?escape=javascript&callback={{callback}}';
handle remainder => sub {
	return @_ ;
};
1;
