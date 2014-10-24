package DDG::Spice::Time;

use DDG::Spice;

primary_example_queries "time Melbourne", "time Australia", "time birmingham";
secondary_example_queries "what time is it in Melbourne", "what is the time in Birmingham";
description "Provides the local time of country, city or state searched";
name "Time";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Time.pm";
icon_url "/i/timeanddate.com.ico";
topics "everyday";
category "geography";
attribution github  => ['https://github.com/chrisjwilsoncom', 'chrisjwilsoncom'];

spice to => 'http://api.xmltime.com/timeservice?accesskey=SSXwafuNGc&secretkey={{ENV{DDG_SPICE_TIME_APIKEY}}}&out=js&prettyprint=1&callback={{callback}}&query=$1&time=1&tz=1&verbosetime=1';

triggers any => "time", "what time is it in", "time in";

handle remainder => sub {
	return $_ if $_;
	return;
};

1;
