#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::LaunchpadProject)],
    'launchpad project bookworm' => test_spice(
        '/js/spice/launchpad_project/bookworm',
        call_type => 'include',
        caller => 'DDG::Spice::LaunchpadProject'
    ),
    'lp project elementary' => test_spice(
        '/js/spice/launchpad_project/elementary',
        call_type => 'include',
        caller => 'DDG::Spice::LaunchpadProject'
    ),
    
    'launchpad bookworm' => undef,
    'lp bug' => undef
);

done_testing;

