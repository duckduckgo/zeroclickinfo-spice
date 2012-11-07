package DDG::Spice::GooglePlus;
# ABSTRACT: Search for Google+ users and return their bio.

use DDG::Spice;

spice to => 'https://www.googleapis.com/plus/v1/people/$1?query=$2&key={{ENV{DDG_SPICE_GOOGLE_PLUS_APIKEY}}}&callback={{callback}}';
spice from => '(.*?)-(.*)';
spice proxy_ssl_session_reuse => "off";

primary_example_queries "google+ duckduckgo";
description "Find Google+ users";
name "GooglePlus";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GooglePlus.pm";
topics "everyday", "social";
category "ids";
attribution github => ['https://github.com/jagtalon','jagtalon'],
            twitter => ['http://twitter.com/juantalon','juantalon'];

spice to => 'https://jobs.github.com/positions.json?description=$1&location=$2&callback={{callback}}';
spice from => '(.*?)-(.*)';

triggers startend => 'google+', 'google plus', 'g+', 'gplus', 'google+ user', 'g+ user', 
'google plus user', 'google+ profile', 'g+ profile', 'gplus profile', 'gplus user', 'g plus profile',
'g plus user';

handle remainder => sub {
	my $query = $_;
	if($query =~ /userid:(\d+)$/) {
		return $1.'-'; 
	}
    if($query =~ /((?:[a-zA-Z]|\s)+)$/) {
		return '-'.$1;
	}
	return;
};
1;
