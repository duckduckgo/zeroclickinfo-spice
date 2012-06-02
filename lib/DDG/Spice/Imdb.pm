package DDG::Spice::Imdb;
# ABSTRACT: Give a summary of the movie from its IMDB page.

use DDG::Spice;

triggers startend => "imdb";

spice to => 'http://www.imdbapi.com/?t=$1&callback={{callback}}';

handle remainder => sub {
	return $_ if $_;
	return;
};

1;
