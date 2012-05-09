package DDG::Spice::IsItUp;

use DDG::Spice;

spice is_cached => 0;

triggers query_lc => qr/^((?:is\s|))([0-9a-z\-]+(\.[0-9a-z\-]+)*?)(?:(\.[a-z]{2,4})|)\s(?:up|down|working)/;

spice to => 'http://isitup.org/$1.json?callback={{callback}}';

handle matches => sub {

    if ($4) {
	# return the domain and it's tld
    	return $2.$4;
    }
    else {
	# append .com only if "is" is in the query and domain is not a subdomain/ip and no tld was given
	if ($1 and not $3) {
	    return $2 . '.com';
	}
	# otherwise just return without '.com' -- stops false positives from showing zci
	else {
	    return $2;
	}
    }
    return;
};

1;

