package DDG::Spice::YogaAsanas;
# ABSTRACT: Displays yoga asanas and sequences 

use strict;
use DDG::Spice;

spice to => 'http://jason.duckduckgo.com:8000/solr/staging/select?version=2.2&defType=edismax&qt=dismax&q=$1 source_match:yoga_asanas_api&fq=&wt=json&start=0&rows=75&json.wrf={{callback}}';

triggers query_lc => qr{
	(?:\w+asanas?\b)|
	(?:\w+sahita\b)|
	(?:\bvinyasa\b)|
	(?:\w+pitham\b)|
	(?:samasthitih?)|
	(?:stplutih??)|
	(?:postures?|poses?)|
	(?:sun\s+salutation)|
	(?:surya\s+namaskara)|
	(?:(?:ashtanga|yoga)\s+(primary|intermediate|advanced)\s+series)|
	(?:yoga[\s-]+ch?ikitsa)|
	(?:(?:standing|finishing)\s+(?:sequence|poses?|postures?))|
	(?:nadi[\s-]+sh?odhana)|
	(?:sthira[\s-]+bhaga)
}xi;

handle query  => sub {
	my $q = $_;
	if(/(?:surya\s+namaskara)|(?:sun\s+salutation)/){
		$q = "\"$q\"~5";
	}
	return $q;
};

1;
