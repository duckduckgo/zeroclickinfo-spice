package DDG::Spice::Apod;
# ABSTRACT: Display astronomy picture of the day

use DateTime;
use DateTime::TimeZone;
use DDG::Spice;

name "Apod";
source "http://apod.nasa.gov/apod/astropix.html";
description "Astronomy picture of the day";
primary_example_queries "apod", "astronomy picture of the day";
secondary_example_queries "astronomy picture";
category "special";
topics "everyday","special_interest";
code_url "https://github.com/duckduckgo/zeroclickinfo-goodie/blob/master/lib/DDG/Spice/Apod.pm";
attribution github => ["https://github.com/killerfish", "Usman Raza"],
            twitter => ["https://twitter.com/f1shie", "Usman Raza"];

spice to => 'http://apod.nasa.gov/apod/ap$1.html';
spice wrap_string_callback => 1;
spice proxy_cache_valid => "200 1d";

triggers start => "astronomy picture of the day","apod","astronomy picture of day","daily astronomy picture","daily astronomy picture";

handle remainder => sub {
	# check current date in users timezone
        my $t = DateTime->now;
        $t->set_time_zone($loc->time_zone);
	return $t->strftime("%g%m%d");
};
1;
