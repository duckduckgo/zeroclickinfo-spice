package DDG::Spice::Time;

use DDG::Spice;

#Attribution
primary_example_queries "time Melbourne", "time Australia", "time birmingham";
secondary_example_queries "what time is it in Melbourne", "what is the time in Birmingham";
description "Provides the local time of country, city or state searched";
name "Time";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Time.pm";
topics "everyday";
category "geography";
attribution github  => ['https://github.com/chrisjwilsoncom', 'chrisjwilsoncom'];


spice from => '([^/]+)/?(?:([^/]+)/?(?:([^/]+)|)|)';
spice to => 'https://api.xmltime.com/timeservice?accesskey=SSXwafuNGc&secretkey={{ENV{DDG_SPICE_TIME_APIKEY}}}&out=js&prettyprint=1&callback={{callback}}&query=$1&time=1&tz=1&verbosetime=1';

# Triggers
triggers any => "time", "what time is it in", "time in";

# Handle statement
handle remainder => sub {

	# optional - regex guard
	# return unless qr/^\w+/;

	return $_ if $_;
	return;
};

1;
