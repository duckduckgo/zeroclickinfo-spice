package DDG::Spice::Scarer;

use strict;
use DDG::Spice;

name 'Scarer';
description 'Shows scary queries';
primary_example_queries 'scare me';
category 'special';
code_url 'https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/Scarer.pm';
attribution
    github => ['pfirsichbluete', 'Pfirsichbluete'];

triggers start => ['scare me', 'show me something scary'];

spice call_type => 'self';

handle remainder => sub {
    return '';
};

1;
