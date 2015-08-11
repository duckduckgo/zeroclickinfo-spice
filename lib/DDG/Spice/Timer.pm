package DDG::Spice::Timer;
# ABSTRACT: Shows a countdown timer

use strict;
use DDG::Spice;

name 'Timer';
description 'Displays a countdown timer';
primary_example_queries 'timer';
category 'special';
topics 'everyday', 'science', 'words_and_games';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Timer.pm';
attribution twitter => 'mattr555',
            github => ['https://github.com/mattr555/', 'Matt Ramina'];

triggers startend => ['timer', 'countdown', 'alarm'];
triggers start => ['time', 'timer for'];

spice call_type => 'self';

handle remainder => sub {
    return if lc($req->query_raw) =~ /^time($|[^r ][\S]+$)/;  #filter out queries with like "time" or "Time::Piece"
    return unless /^( ?([\d.]+ ?(m(in((ute)?s?)?)?|s(ec((ond)?s?)?)?|h(ours?)?|hr)|online) ?)+$/ || $_ eq '';
    return '';
};

1;
