package DDG::Spice::WordMap;
# ABSTRACT: Twinword Word Map Instant Answer

use DDG::Spice;

name 		"Word Map";
description "Generates semantically related words";
source 		"Twinword";
primary_example_queries "similar to sound", "words like sound";
category 	"reference";
topics 		"words_and_games", "everyday";
code_url 	"https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/WordMap.pm";
icon_url 	"/i/www.twinword.com.ico";
attribution web 	=> ['http://twinword.com','Twinword Inc.'],
            twitter => ['http://twitter.com/levelpump', '@levelpump'],
            email 	=> ['feedback@twinword.com','Twinword Inc.'];

spice to => 'http://duckduckgo.twinword.com/api/v2/context/user/duckduckgo/?entry=$1&api_key={{ENV{DDG_SPICE_WORDMAP_APIKEY}}}';
spice wrap_string_callback => 1;

triggers startend => (
	"association:", 
	"evocation", 
	"evocation:", 
	"related words", 
	"related word", 
	"word association", 
	"expand:",
	"context:",	 	
	"expand word", 
	"extend word", 
	"word cloud", 
	"word map", 
	"word cluster", 
	"word graph",
	"twinword",
	"levelpump"
);

triggers start => (
	"similar to", 
	"relate to", 
	"related to", 
	"words like", 
	"word like", 
	"words similar to",
	"more words like"
);

handle remainder => sub {
    return lc $_ if $_;
    return;
};

1;

