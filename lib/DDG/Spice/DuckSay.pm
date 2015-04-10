package DDG::Spice::DuckSay;
# ABSTRACT: Make the duck say something

use strict;
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
    if ($_ ne '') {
        return {call => '/js/spice/duck_say/', call_type => 'self', is_unsafe => 0};
    }
    return $_;
};

1;
