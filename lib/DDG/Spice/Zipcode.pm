package DDG::Spice::Zipcode;
# ABSTRACT: return the location and approximate area of a postal code.

use DDG::Spice;
use URI::Escape;

triggers any => 'zipcode', 'postcode', 'ZIP';

spice from => '(?:([A-Z0-9%/-]+)/([A-Z]+)?)';

spice to => 'http://where.yahooapis.com/v1/places$and(.q($1,$2),.type(11));count=0?appid={{ENV{DDG_SPICE_ZIPCODE_APIKEY}}}&format=json&callback={{callback}}';

handle remainder => sub {
	if (/([A-Z0-9\-]+ ?[A-Z0-9]*) \(([A-Z]+)\)/) {
		return uri_escape($1), $2;
	}; 
	
	return ($_, 'XX') if $_;
	return;
};

# zci is_cached => 1;

1;


