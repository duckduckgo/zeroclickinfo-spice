#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::DuckDuckPill'
    ],
    # multiple filters (color, shape) that returns multiple results
    'pill red round' => test_spice(
        '/js/spice/duck_duck_pill/red%20round',
        call_type => 'include',
        caller => 'DDG::Spice::DuckDuckPill',
    ),
    # returns a single result via NDC search
    'pill 68180-0481-01' => test_spice(
        '/js/spice/duck_duck_pill/68180-0481-01',
        call_type => 'include',
        caller => 'DDG::Spice::DuckDuckPill',
    ),
    # multiple filters (imprint, color) that returns multiple results
    'pill LL blue' => test_spice(
        '/js/spice/duck_duck_pill/LL%20blue',
        call_type => 'include',
        caller => 'DDG::Spice::DuckDuckPill',
    ),
    # no results
    'pill gibberish' => test_spice(
        '/js/spice/duck_duck_pill/gibberish',
        call_type => 'include',
        caller => 'DDG::Spice::DuckDuckPill',
    ),
);

done_testing;
