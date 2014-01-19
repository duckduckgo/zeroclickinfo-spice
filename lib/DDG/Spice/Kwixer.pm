package DDG::Spice::Kwixer;

use DDG::Spice;

#metadata
primary_example_queries "movies with Keira Knightley", "movies directed by steven spielberg";
secondary_example_queries "films with with Tom Cruise and Emily";
description "Advanced movie queries with Kwixer";
name "Kwixer";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Kwixer.pm";
icon_url "https://kwixer.com/favicon.ico";
topics "entertainment", "special_interest";
category "entertainment";
attribution twitter => ['kwixerapp','Kwixer'],
			web => ['https://www.kwixer.com','Kwixer'];


spice to => 'https://www.kwixer.com/api/search?filter=movie&take=40&source=ddg&lang=en&query=$1';
spice wrap_jsonp_callback => 1;

my @triggers = ('movie with','movies with', 'movies starring','film with','films with','films starring','film starring','movies featuring','films featuring',
	#'movies directed by','movies directed', 'directed movies', 'director','film director','film by',
	#'films by','films directed by',
	#'actor','actress',
	'kwixer');
triggers start => @triggers;
triggers end => ('actor','actress');
handle query => sub {
	return $_ if $_;
  	return;
};

1;


