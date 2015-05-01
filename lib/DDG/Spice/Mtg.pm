package DDG::Spice::Mtg;
# ABSTRACT: Information on 'Magic The Gathering' cards

use strict;
use DDG::Spice;

name "Mtg Card Search";
description "Returns information about Magic The Gathering Cards";
primary_example_queries "mtg nullify", "mtg Boros Reckoner";

category "entertainment";
topics "entertainment", "gaming";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/mtg/lib/DDG/Spice/Mtg.pm";
attribution github => ["https://github.com/puskin94", "puskin"];

triggers start => 'mtg', 'magic card', 'magic cards', 'magic the gathering';
spice to => 'http://api.mtgdb.info/cards/$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    $_ =~ s/\://;
    return $_ if $_;
    return;
};

1;

