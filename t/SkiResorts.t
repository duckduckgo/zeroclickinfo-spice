#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::SkiResorts)],
    # Valid queries
    'Chamonix' => test_spice(
        '/js/spice/ski_resorts/Chamonix',
        call_type => 'include',
        caller => 'DDG::Spice::SkiResorts',
        is_cached => 1
    ),
    'Mayrhofen' => test_spice(
        '/js/spice/ski_resorts/Mayrhofen',
        call_type => 'include',
        caller => 'DDG::Spice::SkiResorts',
        is_cached => 1
    ),
    'St Anton' => test_spice(
        '/js/spice/ski_resorts/St-Anton',
        call_type => 'include',
        caller => 'DDG::Spice::SkiResorts',
        is_cached => 1
    ),
    # Invalid queries
    'Fish' => undef,
    'London' => undef,
    'Mountain' => undef
);

done_testing;

