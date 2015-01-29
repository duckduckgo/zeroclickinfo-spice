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
    'leeroy hearthstone' => test_spice(
        '/js/spice/hearthstone/leeroy',
        call_type => 'include',
        caller => 'DDG::Spice::Hearthstone'
    ),
    'hearthstone mirror' => test_spice(
        '/js/spice/hearthstone/mirror',
        call_type => 'include',
        caller => 'DDG::Spice::Hearthstone'
    ),
    'hearthstone' => undef,
    'hearthstone heroes of warcraft' => undef,
    'hearthstone wood stoves' => undef,
    'hearthstone mage deck' => undef,
    'hearthstone tide_caller' => undef,
    'hearthstone tidecaller $' => undef
);

done_testing;
