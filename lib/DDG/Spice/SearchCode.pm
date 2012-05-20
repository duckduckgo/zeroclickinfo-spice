package DDG::Spice::SearchCode;

use DDG::Spice;

triggers query_lc => qr/^(sc|searchcode|codesearch)\s(.*)/;

spice to => 'http://searchco.de/api/jsonp_codesearch_I/?q=$1&callback={{callback}}';

handle matches => sub {
	return $1 if $1;
	return;   
};