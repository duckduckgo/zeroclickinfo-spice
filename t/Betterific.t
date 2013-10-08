#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Betterific )],
    'betterific' => test_spice(
        '/js/spice/betterific/',
        caller => 'DDG::Spice::Betterific',
    ),
    'betterif golf' => test_spice(
        '/js/spice/betterific/golf',
        caller => 'DDG::Spice::Betterific',
    ),
    'betterific golf' => test_spice(
        '/js/spice/betterific/golf',
        caller => 'DDG::Spice::Betterific',
    ),
    'betterif golf balls' => test_spice(
        '/js/spice/betterific/golf%20balls',
        caller => 'DDG::Spice::Betterific',
    ),
    'betterific golf balls' => test_spice(
        '/js/spice/betterific/golf%20balls',
        caller => 'DDG::Spice::Betterific',
    )
);

done_testing;

