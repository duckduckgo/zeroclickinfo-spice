#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::Hearthstone)],
    'hearthstone leeroy jenkins' => test_spice(
        '/js/spice/hearthstone/leeroy%20jenkins',
        call_type => 'include',
        caller => 'DDG::Spice::Hearthstone'
    ),
    'hearthstone leeroy' => test_spice(
        '/js/spice/hearthstone/leeroy',
        call_type => 'include',
        caller => 'DDG::Spice::Hearthstone'
    ),
    'hearthstone' => undef,
);

done_testing;

