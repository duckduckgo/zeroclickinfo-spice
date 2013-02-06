#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Smbc )],
    'smbc' => test_spice(
        '/js/spice/smbc/',
        call_type => 'include',
        caller => 'DDG::Spice::Smbc',
        is_cached => 0
    ),
    'today\'s smbc' => test_spice(
        '/js/spice/smbc/',
        call_type => 'include',
        caller => 'DDG::Spice::Smbc',
        is_cached => 0
    ),
    'todays smbc comic' => test_spice(
        '/js/spice/smbc/',
        call_type => 'include',
        caller => 'DDG::Spice::Smbc',
        is_cached => 0
    ),
);

done_testing;

