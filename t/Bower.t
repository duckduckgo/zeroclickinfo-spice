#!/usr/bin/env perl

use strict;
use warnings;

use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [
        'DDG::Spice::Bower'
    ],
    'bower jquery' => test_spice(
        '/js/spice/bower/jquery',
        call_type => 'include',
        caller => 'DDG::Spice::Bower',
        is_cached => 1
    ),
    'jquery bower' => test_spice(
        '/js/spice/bower/jquery',
        call_type => 'include',
        caller => 'DDG::Spice::Bower',
        is_cached => 1
    )
);

done_testing;
