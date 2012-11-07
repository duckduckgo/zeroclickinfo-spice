package DDG::Spice::FlashVersion;

use DDG::Spice;

triggers startend => "flash";

spice call_type => 'self';

primary_example_queries "flash version";
description "Shows the flash version";
name "FlashVersion";
code_url "https://github.com/duckduckgo/zeroclickinfo-spice/blob/master/lib/DDG/Spice/FlashVersion.pm";
topics => "everyday", "programming";
category => "software";
attribution github => ['https://github.com/Getty','Torsten Raudssus'],
           twitter => ['https://twitter.com/raudssus','Torsten Raudssus'];
status "disabled";

handle query_lc => sub {
    return $_ eq 'flash version' ? call : ();
};

1;
