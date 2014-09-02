package DDG::Spice::DuckSay;

use DDG::Spice;

triggers start => 'ducksay';

spice to => 'http://www.reddit.com/r/Jokes/search.json?q=selftext%3Aduck&restrict_sr=on&sort=hot&t=all&jsonp={{callback}}';

handle remainder => sub {
    spice call_type => 'include';
    if ($_ ne '') {
        # Skip calling reddit's API if text is given
        spice call_type => 'self';
        call;
    }
    return $_;
};

1;