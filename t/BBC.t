#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::BBC )],
    'what\'s on bbc 3' => test_spice(
        '/js/spice/bbc/bbcthree//today',
        call_type => 'include',
        caller => 'DDG::Spice::BBC'
    ),
    'bbc radio 1 schedule' => test_spice(
        '/js/spice/bbc/radio1/england/today',
        call_type => 'include',
        caller => 'DDG::Spice::BBC'
    ),
    'bbc two tomorrow' => test_spice(
        '/js/spice/bbc/bbctwo/england/tomorrow',
        call_type => 'include',
        caller => 'DDG::Spice::BBC'
    ),
);

done_testing;

