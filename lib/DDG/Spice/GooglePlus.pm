package DDG::Spice::GooglePlus;
# ABSTRACT: Search for Google+ users and return their bio.

use strict;
use DDG::Spice;

spice to => 'https://www.googleapis.com/plus/v1/people/?query=$1&key={{ENV{DDG_SPICE_GOOGLE_PLUS_APIKEY}}}&callback={{callback}}&maxResults=12';
spice proxy_ssl_session_reuse => "off";

my @triggers = share("triggers.txt")->slurp;
triggers startend => @triggers;

handle remainder => sub {
    return $_ if $_;
    return;
};

1;
