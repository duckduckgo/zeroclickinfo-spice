package DDG::Spice::Astrobin::Subject;
# ABSTRACT: Retrieve images based on subject.

use DDG::Spice;

name "Astrobin Subject";
source "http://www.astrobin.com";
description "Astrophotography images fetched by group search";
primary_example_queries "astrophoto M31", "astronomy pictures saturn";
category "special";
topics "special_interest";
icon_url "http://www.astrobin.com/favicon.ico";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Astrobin/Subject.pm";
attribution github => ["https://github.com/killerfish", "Usman Raza"],
            twitter => ["https://twitter.com/f1shie", "Usman Raza"];

triggers start => "astrophoto", "astrophotography", "astronomy pictures";
spice to => 'http://www.astrobin.com/api/v1/image/?title__icontains=$1&api_key=4700a6eb2e4738230adc35f695e407bca0ec399c&api_secret=3560d096f280e38d1a94e12b0d4063f943954f03&format=json';

spice wrap_jsonp_callback => 1;

handle remainder => sub {
	return $_ if $_;
	return;
};	
1;
