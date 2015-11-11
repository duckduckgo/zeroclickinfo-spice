package DDG::Spice::Mtg;
# ABSTRACT: Information on 'Magic The Gathering' cards

use strict;
use DDG::Spice;

triggers start => 'mtg', 'magic card', 'magic cards', 'magic the gathering';
spice to => 'http://api.mtgdb.info/cards/$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    $_ =~ s/\://;
    return $_ if $_;
    return;
};

1;

