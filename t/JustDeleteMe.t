#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

spice is_cached => 1;

ddg_spice_test(
    [qw( DDG::Spice::JustDeleteMe)],
    'delete my facebook account' => test_spice(
        '/js/spice/just_delete_me/facebook',
        call_type => 'include',
        caller => 'DDG::Spice::JustDeleteMe'
    ),
    'remove facebook account' => test_spice(
        '/js/spice/just_delete_me/facebook',
        call_type => 'include',
        caller => 'DDG::Spice::JustDeleteMe'
    ),
    'cancel account on facebook' => test_spice(
        '/js/spice/just_delete_me/facebook',
        call_type => 'include',
        caller => 'DDG::Spice::JustDeleteMe'
    ),
    'beam.pro delete account' => test_spice(
        '/js/spice/just_delete_me/beam.pro',
        call_type => 'include',
        caller => 'DDG::Spice::JustDeleteMe'
    ),
    'cancel cloud account' => test_spice(
        '/js/spice/just_delete_me/cloud',
        call_type => 'include',
        caller => 'DDG::Spice::JustDeleteMe'
    ),
    'cancel cloud account!' => test_spice(
        '/js/spice/just_delete_me/cloud',
        call_type => 'include',
        caller => 'DDG::Spice::JustDeleteMe'
    ),
    'facebook account' => undef,   # does not contain any of the triggers
    'delete facebook' => undef,   # does not contain any of the required words
    'delete fac account' => undef # keyword shorter than 4 characters
);

done_testing;

