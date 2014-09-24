package DDG::Spice::Stopwatch;

use DDG::Spice;

name 'Stopwatch';
description 'Displays a stopwatch';
primary_example_queries 'stopwatch';
category 'special';
topics 'everyday', 'science', 'words_and_games';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Stopwatch.pm';
attribution twitter => 'mattr555',
            github => ['https://github.com/mattr555/', 'Matt Ramina'];

triggers startend => ['stopwatch', 'stop watch'];

#in real code this should just be spice call_type => 'self'
#for now, it lets me test on DuckPAN
spice call_type => 'self';

handle remainder => sub {
    return '' if ($_ eq '' || $_ eq 'online');
    return;
};

1;
