package DDG::Spice::FlashVersion;

use DDG::Spice;

triggers startend => "flash";

spice call_type => 'self';

handle query_lc => sub {
    return call if ($_ eq 'flash version');
};

1;
