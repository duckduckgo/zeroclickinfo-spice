package DDG::Spice::ISSLocation;
# ABSTRACT: Returns International Space Station's current location from Open Notify API.

use DDG::Spice;

primary_example_queries "iss location";
secondary_example_queries "iss position";
description "International Space Station Location";
name "ISSLocation";
source "open-notify";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/ISSLocation.pm";
topics "science";
category "random";
attribution github => ['https://github.com/rishiag','Rishi Agarwal'],
           twitter => ['http://twitter.com/rishiagar','Rishi Agarwal'];

triggers any => "iss location", "iss position", "iss tracker", "iss tracking";
spice to => 'http://api.open-notify.org/iss-now.json?callback={{callback}}';
spice proxy_cache_valid => "418 1d";

handle remainder => sub {
    return $_ if $_;
};

1;
