package DDG::Spice::Xkcd::Latest;
#ABSTRACT: gets the info on the latest xkcd comic.
#called by display spice to decide if the 'next' link needs to be displayed

use strict;
use DDG::Spice;

spice to => 'http://xkcd.com/info.0.json';
triggers startend => "///***never trigger***///";

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;
