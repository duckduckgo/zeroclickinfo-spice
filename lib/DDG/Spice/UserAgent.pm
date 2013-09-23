package DDG::Spice::UserAgent;

use DDG::Spice;

name "User Agent";
description "Returns user agent information";
primary_example_queries "useragent";
topics "programming", "sysadmin";
category "reference";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/UserAgent.pm";
attribution web => ['http://duckduckgo.com', 'DuckDuckGo'],
            twitter => ['http://twitter.com/duckduckgo', 'duckduckgo'];

triggers startend => "user agent", "useragent";

spice call_type => 'self';

handle query_lc => sub {
    return $_ eq 'user agent' ? call : ();
};

1;