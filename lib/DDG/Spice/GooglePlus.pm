package DDG::Spice::GooglePlus;
# ABSTRACT: Search for Google+ users and return their bio.

use DDG::Spice;

primary_example_queries "google+ duckduckgo";
description "Find Google+ users";
name "GooglePlus";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/GooglePlus.pm";
topics "everyday", "social";
category "ids";
attribution github => ['https://github.com/jagtalon','jagtalon'],
            twitter => ['http://twitter.com/juantalon','juantalon'];

spice to => 'https://www.googleapis.com/plus/v1/people/?query=$1&key={{ENV{DDG_SPICE_GOOGLE_PLUS_APIKEY}}}&callback={{callback}}&maxResults=12';
spice proxy_ssl_session_reuse => "off";

my @triggers = share("triggers.txt")->slurp;
triggers startend => @triggers;

handle remainder => sub {
	return $_ if $_;
	return;
};

1;
