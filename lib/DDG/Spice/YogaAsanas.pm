package DDG::Spice::YogaAsanas;
# ABSTRACT: Displays yoga asanas and sequences 

use strict;
use utf8;
use DDG::Spice;

spice to => 'http://jason.duckduckgo.com:8000/solr/staging/select?version=2.2&defType=edismax&qt=dismax&q=$1+source_match:yoga_asanas_api&fq=&wt=json&start=0&rows=75&sort=p_count+asc&json.wrf={{callback}}';

triggers query_lc => qr{
	(?:\w+[aā]sanas?\b)|
	(?:\w+sahita\b)|
	(?:\bvinyasa\b)|
	(?:\w+pitham\b)|
	(?:samasthitih?)|
	(?:stplutih?)|
	(?:postures?|poses?)|
	(?:sun\s+salutation)|
	(?:s[uū]rya[\s-]+namask[aā]ra)|
	(?:(?:ashtanga|yoga)\s+(primary|intermediate|advanced)\s+series)|
	(?:yoga[\s-]+ch?ikits[aā])|
	(?:(?:standing|finishing)\s+(?:sequence|poses?|postures?))|
	(?:n[aā][ḍd]i[\s-]+[sś]h?odhana)|
	(?:sthira[\s-]+bhaga)
}x;

handle query  => sub {
	my $q = $_;

	# This makes sure "a" or "b", if specified, is associated with
	# with either the practice or the posture, but not both 
	return "\"$q\"~10";
};

1;
