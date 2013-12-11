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


spice to => 'https://kwixer.com/api/watching/movie/explore?take=20&skip=0&query=$1';
spice wrap_jsonp_callback => 1;

my @triggers = ('movie' ,'movie with',  'movies', 'movies with', 'movies starring','film with','films with','films starring','film starring',
	'movies directed by','movies directed', 'directed movies', 'director','film director','film by',
	'actor','actress' ,
	'kwixer');
triggers start => @triggers;
triggers end => ('actor','actress','movies','films','movie','film');
handle remainder => sub {
	# deliminater logic from Movie.pm
    #my $input = $_;
    #map { return $input if $input =~ s/(^|\s)$_(\s|$)// and $input ne '' } @triggers;
    #return;
  	return $_ if $_;
  	return;
};

1;

