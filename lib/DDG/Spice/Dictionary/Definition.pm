package DDG::Spice::Dictionary::Definition;

use DDG::Spice;

spice to => 'https://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&useCanonical=false&includeTags=false&limit=3&api_key={{ENV{DDG_SPICE_RANDWORD_APIKEY}}}&callback={{callback}}';
triggers startend => "define", "define:", "definition", "definition of", "definition of:";
spice is_cached => 1;

handle query_lc => sub {
	my $query = $_;
	if($query =~ /^(?:definition of\:?|define\:?|definition\:?) (.+)/) {
		$query = $1;
		$query =~ s/^\s+|\s+$//g;
		return lc $query;
	} elsif($query =~ /(.+) (?:define|definition)$/) {
		$query = $1;
		$query =~ s/^\s+|\s+$//g;
		return lc $query;
	}
    return;
};

1;