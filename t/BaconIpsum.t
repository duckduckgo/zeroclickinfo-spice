#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::BaconIpsum)],

    'baconipsum 6' => test_spice(
        '/js/spice/bacon_ipsum/6',
        call_type => 'include',
        caller => 'DDG::Spice::BaconIpsum'
    ),
    'baconipsum 12' => test_spice(
        '/js/spice/bacon_ipsum/12',
        call_type => 'include',
        caller => 'DDG::Spice::BaconIpsum'
    ),
    'what is baconipsum' => undef,
    'baconipsum website' => undef,
    'baconipsum leh' => undef,
);

done_testing;


