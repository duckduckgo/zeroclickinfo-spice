package DDG::Spice::Mtg;

# mtg <card name> Returns infos on the Magic The Gathering Card

use DDG::Spice;

name "Mtg Card Search";
description "mtg <card name> Returns infos on the Magic The Gathering Card";
primary_example_queries "mtg nullify", "mtg Boros Reckoner";

category "entertainment";
topics "entertainment", "gaming";
code_url "https://github.com/puskin94/zeroclickinfo-spice/blob/mtg/lib/DDG/Spice/Mtg.pm";
attribution github => ["https://github.com/puskin94", "puskin"];

triggers start => 'mtg';
spice to => 'http://api.mtgdb.info/cards/$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub {
    $_ =~ s/\://;
    return $_ if $_;
    return;
};

1;

