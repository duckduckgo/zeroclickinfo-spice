#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw(DDG::Spice::Launchbug)],

    'LP: #123' => test_spice(
        '/js/spice/launchbug/123',
        call_type => 'include',
        caller => 'DDG::Spice::Launchbug'
    ),

    'launchbug: #123' => test_spice(
        '/js/spice/launchbug/123',
        call_type => 'include',
        caller => 'DDG::Spice::Launchbug'
    ),

    'lp 123' => test_spice(
        '/js/spice/launchbug/123',
        call_type => 'include',
        caller => 'DDG::Spice::Launchbug'
    ),

    'bugid #123' => test_spice(
        '/js/spice/launchbug/123',
        call_type => 'include',
        caller => 'DDG::Spice::Launchbug'
    ),

    'LP: #4r5' => undef,
);

done_testing;

