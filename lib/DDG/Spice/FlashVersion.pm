package DDG::Spice::FlashVersion;
# ABSTRACT: Shows installed flash version

use strict;
use DDG::Spice;

primary_example_queries "flash version";
description "Shows the flash version";
name "Flash Version";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/FlashVersion.pm";
topics "everyday", "programming";
category "software";
attribution github => ['https://github.com/Getty','Torsten Raudssus'],
           twitter => ['https://twitter.com/raudssus','Torsten Raudssus'];

triggers startend => "flash";

spice call_type => 'self';

handle query_lc => sub {
    return $_ eq 'flash version' ? call : ();
};

1;
