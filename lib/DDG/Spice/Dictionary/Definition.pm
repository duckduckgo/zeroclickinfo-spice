package DDG::Spice::Dictionary::Definition;

use DDG::Spice;

description "Get the definition of a word";
name "Dictionary";
primary_example_queries "define inundate";
secondary_example_queries "definition of dictionary";
topics "words_and_games";
category "language";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Dictionary/Definition.pm";
attribution web => ['http://duckduckgo.com', 'DuckDuckGo'],
            twitter => ['http://twitter.com/duckduckgo', '@duckduckgo'];
status "enabled";

spice to => 'https://api.wordnik.com/v4/word.json/$1/definitions?includeRelated=true&useCanonical=true&includeTags=true&limit=3&api_key={{ENV{DDG_SPICE_WORDNIK_APIKEY}}}&callback={{callback}}';
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