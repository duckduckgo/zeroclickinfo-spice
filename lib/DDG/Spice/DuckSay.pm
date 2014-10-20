package DDG::Spice::DuckSay;

use DDG::Spice;

name 'DuckSay';
description 'Like cowsay, but with ducks';
primary_example_queries 'ducksay', 'daxsays';
secondary_example_queries 'ducksay quack!', 'daxsays quack!';
source 'Reddit /r/jokes';
category 'entertainment';
topics 'geek', 'words_and_games', 'entertainment';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/DuckSay.pm';
attribution github => ['https://github.com/csytan', 'Chris Tan'];

triggers start => 'ducksay', 'daxsays';

spice is_unsafe => 1;
spice to => 'http://www.reddit.com/r/Jokes/search.json?q=selftext%3Aduck&restrict_sr=on&sort=hot&t=all&jsonp={{callback}}';

handle remainder => sub {
    spice call_type => 'include';
    if ($_ ne '') {
        # Skip calling reddit's API if text is given
        spice call_type => 'self';
        return call;
    }
    return $_;
};

1;