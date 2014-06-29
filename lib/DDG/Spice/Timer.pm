package DDG::Spice::Timer;
# ABSTRACT: Provides a countdown timer

use DDG::Spice;

triggers end => ['timer', 'countdown', 'countdown timer', 'egg timer'];

spice call_type => 'self';

handle remainder => sub {
    return '' if ($_ eq '' || $_ eq 'online' || $_ eq 'browser');
    return;
};

1;