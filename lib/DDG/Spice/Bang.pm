package DDG::Spice::Bang;

use DDG::Spice;

name 'Bang';
description 'Shows where a specific !bang goes';
primary_example_queries '?w';
category 'bang';
topics 'everyday';
code_url 'https://github.com/yzwx/zeroclickinfo-spice/blob/bang/lib/DDG/Spice/Bang.pm';
attribution github => ['https://github.com/yzwx', 'yzwx'];

triggers query_lc => qr/^\?[A-Za-z0-9.-]+/;

spice call_type => 'self';

handle query => sub {
    return '' if $_;
    return;
};

1;
