package DDG::Spice::Launchbug;
# ABSTRACT: Bug search on launchpad

use strict;
use DDG::Spice;

spice is_cached => 1;


triggers any => "launchbug", "lp", "bugid", "(lp";
spice to => 'https://api.launchpad.net/devel/bugs/$1?ws.accept=application%2Fjson';
spice wrap_jsonp_callback => 1;


handle remainder => sub {

    return unless $_ && $_ =~ qr/^\#?(\d+)\)?$/;
    return $1;

};

1;
