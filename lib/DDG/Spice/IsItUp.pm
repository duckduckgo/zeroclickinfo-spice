package DDG::Spice::IsItUp;

use DDG::Spice;

spice is_cached => 0;

triggers query_lc => qr/^((?:is\s|))([0-9a-z\-]+)(?:(\.[a-z]{2,4})|)\s(?:up|down|working)/;

spice to => 'http://isitup.org/$1.json?callback={{callback}}';

handle matches => sub {
    # could also be done in 1 line with: return $1 ? ($3 ? $2.$3 : $2.'.com') : ($3 ? $2.$3 : $2);

    if ($3) {
	# return the domain and the root url
	return $2.$3;
    }
    else {
	# append .com only if "is" is in the query and there's no other domain given
	if ($1) {
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

