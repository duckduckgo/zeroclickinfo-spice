#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::LaunchpadProject)],
    'launchpad project bookworm' => test_spice(
        '/js/spice/launchpad_project/query',
        call_type => 'include',
        caller => 'DDG::Spice::LaunchpadProject'
    ),
    'lp project elementary' => test_spice(
        '/js/spice/launchpad_project/query',
        call_type => 'include',
        caller => 'DDG::Spice::LaunchpadProject'
    ),
    'launchpad bookworm' => undef,
    'lp elementary' => undef
);

done_testing;

