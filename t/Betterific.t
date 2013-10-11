#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Betterific )],
    'betterific' => test_spice(
        '/js/spice/betterific/',
        call_type => 'include',
        caller => 'DDG::Spice::Betterific',
    ),
    'betterif golf' => test_spice(
        '/js/spice/betterific/golf',
        call_type => 'include',
        caller => 'DDG::Spice::Betterific',
    ),
    'betterific golf' => test_spice(
        '/js/spice/betterific/golf',
        call_type => 'include',
        caller => 'DDG::Spice::Betterific',
    ),
    'betterif golf balls' => test_spice(
        '/js/spice/betterific/golf%20balls',
        call_type => 'include',
        caller => 'DDG::Spice::Betterific',
    ),
    'betterific golf balls' => test_spice(
        '/js/spice/betterific/golf%20balls',
        call_type => 'include',
        caller => 'DDG::Spice::Betterific',
    )
);

done_testing;

