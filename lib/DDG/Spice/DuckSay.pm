package DDG::Spice::DuckSay;
# ABSTRACT: Make the duck say something

use strict;
use DDG::Spice;

triggers start => 'ducksay', 'daxsays';

spice is_unsafe => 1;
spice to => 'http://www.reddit.com/r/Jokes/search.json?q=selftext%3Aduck&restrict_sr=on&sort=hot&t=all&jsonp={{callback}}';

handle remainder => sub {
    if ($_ ne '') {
        return {call => '/js/spice/duck_say/', call_type => 'self', is_unsafe => 0};
    }
    return $_;
};

1;
