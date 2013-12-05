package DDG::Spice::Kwixer;

use DDG::Spice;

spice to => 'https://kwixer.com/api/watching/movie/explore?take=20&skip=0&query=$1';
spice wrap_jsonp_callback => 1;
category "entertainment";
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
  	return "$_" if $_;
};

1;

