package DDG::Spice::Kwixer;

use DDG::Spice;

#metadata
primary_example_queries "movies with Keira Knightley";
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

my @triggers = ('new movies with','new movies featuring','new movies starring',
				'new movie with','new movie featuring','new movie starring',
				'newest movies with','newest movies featuring','newest movies starring',
				'newest movie with','newest movie featuring','newest movie starring',
				'new films with','new films starring','new films featuring',
				'new film with','new film starring','new film featuring',
				'newest films with','newest films starring','newest films featuring',
				'newest film with','newest film starring','newest film featuring',
	'movie with','movies with', 'movies starring','film with','films with','films starring','film starring','movies featuring','films featuring',
    'movies by','movies directed by','movies director', 
    'movie by','movie directed by','movie director',  
	'films by','films directed by','films director',
    'film by','film directed by','film director',
    'director',
	'actor','actress',
	'kwixer');
triggers start => @triggers;
triggers end => ('actor','actress', 'director');
handle query => sub {
	return $_ if $_;
  	return;
};

1;


