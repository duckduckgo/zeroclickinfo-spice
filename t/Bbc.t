#!/usr/bin/env perl

use strict;
use warnings;
use Test::More;
use DDG::Test::Spice;

ddg_spice_test(
    [qw( DDG::Spice::Bbc )],
    'what\'s on bbc 3' => test_spice(
        '/js/spice/bbc/bbcthree',
        call_type => 'include',
        caller => 'DDG::Spice::Bbc'
    ),
    'bbc radio 1 schedule' => test_spice(
        '/js/spice/bbc/radio1/england',
        call_type => 'include',
        caller => 'DDG::Spice::Bbc'
    ),
    'bbc two tomorrow' => test_spice(
        '/js/spice/bbc/bbctwo/england/tomorrow',
        call_type => 'include',
        caller => 'DDG::Spice::Bbc'
    ),
);

done_testing;

