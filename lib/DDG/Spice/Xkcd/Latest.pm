package DDG::Spice::Xkcd::Latest;
#ABSTRACT: gets the info on the latest xkcd comic.
#called by display spice to decide if the 'next' link needs to be displayed

use strict;
use DDG::Spice;

attribution twitter => ['https://twitter.com/mattr555', 'Matt Ramina'],
            github => ['https://github.com/mattr555', 'Matt Ramina'];

spice to => 'http://xkcd.com/info.0.json';
triggers startend => "///***never trigger***///";

handle query_lc => sub {
    return $_ if $_;
    return;
};

1;
